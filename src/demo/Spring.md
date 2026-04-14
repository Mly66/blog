---
title: Spring Boot
icon: object-group
order: 2
category:
  - 使用指南
tag:
  - Spring Boot
  - Java
  - 后端开发
author: Mr.Mly
date: 2024-11-02
footer: Mly
copyright: Mly
---

# Spring Boot 完全指南

Spring Boot 是一个开源的 Java 框架，用于简化新 Spring 应用的初始搭建以及开发过程。它通过"约定优于配置"的理念，让开发者能够快速构建生产级的 Spring 应用。

## 1. Spring Framework 核心

Spring Boot 建立在 Spring 框架之上，继承了 Spring 的强大功能：

### 核心模块

| 模块 | 功能 | 应用场景 |
|------|------|---------|
| **Spring Core** | IoC 容器、依赖注入 | 对象管理与解耦 |
| **Spring AOP** | 面向切面编程 | 日志、事务、权限拦截 |
| **Spring MVC** | Web 请求处理 | RESTful API 开发 |
| **Spring Data** | 数据访问抽象 | 数据库操作简化 |
| **Spring Security** | 安全认证框架 | 身份验证与授权 |
| **Spring Test** | 测试支持 | 单元测试与集成测试 |

```java
// IoC 容器示例：依赖注入
@Service
public class UserService {
    private final UserRepository userRepository;
    
    // 构造器注入（推荐方式）
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

## 2. Spring Boot Starter 自动配置

Spring Boot Starter 是一种快速启动项目的方式，通过自动配置减少手动配置：

### 常用 Starter

```xml
<!-- Maven 依赖示例 -->
<dependencies>
    <!-- Web 开发 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- 数据访问 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- 安全认证 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- 模板引擎 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    
    <!-- 测试 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 自动配置原理

```java
// @SpringBootApplication 包含三个核心注解
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 等价于：
// @Configuration   - 声明配置类
// @EnableAutoConfiguration - 开启自动配置
// @ComponentScan   - 组件扫描
```

**自动配置流程**：
1. 读取 `META-INF/spring.factories` 中的自动配置类
2. 根据 `@Conditional` 注解判断是否加载配置
3. 注册 Bean 到 Spring 容器

## 3. Spring Boot Actuator 监控

Actuator 提供应用的监控和管理功能：

### 常用端点

| 端点 | 功能 | 示例 |
|------|------|------|
| `/actuator/health` | 健康检查 | `{"status":"UP"}` |
| `/actuator/info` | 应用信息 | 自定义版本信息 |
| `/actuator/metrics` | 指标数据 | JVM、HTTP 指标 |
| `/actuator/env` | 环境变量 | 配置属性查看 |
| `/actuator/beans` | Bean 列表 | 所有注册的 Bean |

```yaml
# application.yml 配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,env
  endpoint:
    health:
      show-details: always
```

## 4. Spring Data 数据访问

Spring Data 简化了数据库操作：

```java
// JPA 实体类
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String email;
}

// Repository 接口
public interface UserRepository extends JpaRepository<User, Long> {
    // 方法命名查询
    Optional<User> findByUsername(String username);
    List<User> findByEmailContaining(String keyword);
    
    // JPQL 查询
    @Query("SELECT u FROM User u WHERE u.username LIKE %:keyword%")
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}
```

## 5. 最佳实践

### 配置文件管理

```yaml
# application.yml - 多环境配置
spring:
  profiles:
    active: dev

---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:mysql://localhost:3306/dev_db
    username: root
    password: root

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://prod-server:3306/prod_db
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

### 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.joining(", "));
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            message,
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
```

---

> **总结**：Spring Boot 通过自动配置、Starter 依赖和 Actuator 监控等功能，大幅简化了 Spring 应用的开发。它是现代 Java 后端开发的事实标准，值得深入学习和使用。
