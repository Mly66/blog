---
title: Spring Cloud
icon: gears
order: 4
category:
  - 使用指南
tag:
  - Spring Cloud
  - 微服务
  - Java
  - 分布式
author: Mr.Mly
date: 2024-11-03
footer: Mly
copyright: Mly
---

# Spring Cloud 完全指南

Spring Cloud 是一系列框架的集合，用于简化分布式系统的开发。它基于 Spring Boot 提供了快速构建微服务架构的能力，解决了分布式系统中常见的配置管理、服务发现、负载均衡、熔断等问题。

## 1. 微服务架构概览

### 为什么需要微服务？

| 单体架构 | 微服务架构 |
|---------|-----------|
| 所有功能打包在一个应用中 | 功能拆分为独立服务 |
| 扩展困难 | 独立扩展 |
| 技术栈单一 | 多语言混合 |
| 部署风险高 | 独立部署，风险隔离 |
| 故障影响全局 | 故障隔离 |

### Spring Cloud 核心组件

```
┌─────────────────────────────────────────────────────┐
│                   API Gateway                        │
│                  (Spring Gateway)                    │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    ┌───────┐ ┌───────┐ ┌───────┐
    │服务 A  │ │服务 B  │ │服务 C  │
    └───┬───┘ └───┬───┘ └───┬───┘
        │         │         │
        └─────────┼─────────┘
                  ▼
    ┌─────────────────────────┐
    │   服务注册中心           │
    │  (Nacos / Eureka)       │
    └─────────────────────────┘
```

## 2. 服务注册与发现

### Nacos（推荐）

Nacos 是阿里巴巴开源的服务注册中心，同时支持配置管理：

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: dev
  application:
    name: user-service
```

```java
// 启动类添加注解
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

### Eureka（经典方案）

```xml
<!-- Eureka Server -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>

<!-- Eureka Client -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

```yaml
# Eureka Server 配置
eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:8761/eureka/
```

## 3. 负载均衡

### Ribbon + RestTemplate

```java
@Configuration
public class RestTemplateConfig {
    
    @Bean
    @LoadBalanced  // 开启负载均衡
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Order createOrder(Long userId) {
        // 服务名代替具体 IP
        User user = restTemplate.getForObject(
            "http://user-service/users/" + userId, 
            User.class
        );
        // 创建订单逻辑...
    }
}
```

### OpenFeign（推荐）

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

```java
// 声明式客户端
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
    
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable("id") Long id);
    
    @PostMapping("/users")
    User createUser(@RequestBody User user);
}

// 降级处理
@Component
public class UserClientFallback implements UserClient {
    
    @Override
    public User getUserById(Long id) {
        return new User(id, "降级用户", "fallback@example.com");
    }
    
    @Override
    public User createUser(User user) {
        return null;
    }
}
```

## 4. 服务网关

### Spring Cloud Gateway

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

```yaml
# 路由配置
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1
```

### 全局过滤器

```java
@Component
public class AuthFilter implements GlobalFilter, Ordered {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        
        if (token == null || !token.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        
        // 验证 Token
        if (!isValidToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }
        
        return chain.filter(exchange);
    }
    
    @Override
    public int getOrder() {
        return -1;  // 优先级
    }
}
```

## 5. 断路器模式

### Sentinel（推荐）

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

```java
@RestController
public class OrderController {
    
    @SentinelResource(
        value = "createOrder",
        fallback = "createOrderFallback",
        blockHandler = "createOrderBlockHandler"
    )
    @PostMapping("/orders")
    public Order createOrder(@RequestBody OrderRequest request) {
        // 创建订单逻辑
    }
    
    // 业务异常降级
    public Order createOrderFallback(OrderRequest request, Throwable e) {
        log.error("创建订单失败", e);
        return null;
    }
    
    // 限流/降级处理
    public Order createOrderBlockHandler(OrderRequest request, BlockException e) {
        throw new BusinessException("请求过于频繁，请稍后重试");
    }
}
```

### 限流规则配置

```yaml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
      eager: true
```

## 6. 配置中心

### Nacos Config

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

```yaml
# bootstrap.yml
spring:
  application:
    name: user-service
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        file-extension: yaml
        namespace: dev
        group: DEFAULT_GROUP
```

```java
// 动态刷新配置
@RefreshScope
@RestController
public class ConfigController {
    
    @Value("${custom.config.value}")
    private String configValue;
    
    @GetMapping("/config")
    public String getConfig() {
        return configValue;
    }
}
```

## 7. 链路追踪

### Sleuth + Zipkin

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>
```

```yaml
spring:
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      probability: 1.0  # 采样率 100%
```

---

> **总结**：Spring Cloud 通过集成多种优秀的分布式组件，为微服务架构提供了完整的解决方案。从服务注册发现、负载均衡、网关路由、熔断降级到配置中心，Spring Cloud 覆盖了微服务开发的各个场景，是现代分布式系统开发的首选框架。
