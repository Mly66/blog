---
icon: pen-to-square
date: 2024-03-13
category:
  - 面试
tag:
  - Spring
---
# Spring
## **🔥 Spring 面试八股文**  

---

### **1️⃣ 为什么要使用 Spring？🚀**
✅ **Spring 是轻量级的框架**，提供了 **IOC（控制反转） & AOP（面向切面编程）** 两大核心功能：  
✔ **IOC 容器**：管理 Bean 的生命周期，**自动注入依赖**，降低耦合。  
✔ **AOP 机制**：**解耦业务逻辑 & 系统服务**（如事务管理、日志、权限校验等）。  

---

### **2️⃣ Spring 主要模块 📌**
| **模块** | **功能** |
|---|---|
| **Spring Core** | 提供 IoC 控制反转 & 依赖注入 |
| **Spring AOP** | 提供面向切面编程，解耦业务逻辑 |
| **Spring WebMVC** | 提供 MVC 结构，支持 SpringMVC |
| **Spring ORM** | 支持 JPA、Hibernate、MyBatis 等 ORM 框架 |
| **Spring Test** | 提供测试支持，方便单元测试 |
| **Spring WebSocket** | 支持 WebSocket 连接 |

---

### **3️⃣ Spring IoC（控制反转）💡**
✅ **什么是 IoC？**
- **控制反转（Inversion of Control，IoC）**：对象的创建不由程序控制，而是 **交给 Spring 容器管理**。  
- **DI（Dependency Injection，依赖注入）**：Spring **自动注入对象的依赖关系**，降低耦合性。  

✅ **IoC 的优点**：
✔ **降低代码耦合度**，符合**依赖倒置原则（DIP）**。  
✔ **统一资源管理**，Spring 维护对象实例，开发者**无需手动创建对象**。  

✅ **DI 的几种实现方式**：
✔ **构造函数注入**：  
```java
@Component
public class UserService {
    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
✔ **Setter 注入**：
```java
@Component
public class UserService {
    private UserRepository userRepository;
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
✔ **注解方式**（`@Autowired`、`@Resource`、`@Qualifier`）：
```java
@Autowired  // 默认按类型注入
@Resource  // 默认按名称注入，找不到再按类型
@Qualifier("userRepository") // 指定具体 Bean
```

✅ **为什么官方推荐构造器注入？**
- **`@Autowired` 可能会导致空指针异常（NPE）**。  
- 推荐使用 **Lombok 的 `@RequiredArgsConstructor` 自动生成构造方法**，简化代码。  

---

### **4️⃣ Spring Bean & 作用域 🔥**
✅ **Spring Bean 是什么？**
- **Spring 管理的 Java 对象**，生命周期由 Spring 控制，与普通 JavaBean 不同。  

✅ **Bean 作用域（`@Scope`）**
| **作用域** | **描述** |
|---|---|
| **singleton** | **默认**，单例模式，整个应用共享一个 Bean |
| **prototype** | 每次获取 Bean 时，都会创建一个新实例 |
| **request** | HTTP 请求级别的 Bean，每次请求创建新实例 |
| **session** | HTTP 会话级别的 Bean，每个 session 共享 |
| **global-session** | 跨应用 session 共享（一般用于 Portlet） |
| **websocket** | WebSocket 连接级别的 Bean |

✅ **Bean 生命周期**
- **实例化** → **属性赋值** → **初始化** → **销毁**
- **扩展接口**：
  - `BeanPostProcessor`：初始化前后增强 Bean。  
  - `InstantiationAwareBeanPostProcessor`：实例化前后增强。  
  - `Aware` 接口：获取 IoC 资源，如 `ApplicationContext`。  

✅ **Bean 线程安全问题**
- **单例 Bean** **⚠可能存在线程安全问题**，特别是有 **可变状态** 时（如 `List`）。  
- **解决方案**：
  ✔ **使用 `prototype` 作用域**（但会频繁创建实例）。  
  ✔ **使用 `ThreadLocal` 维护线程级变量**。  
  ✔ **使用线程安全集合，如 `ConcurrentHashMap`**。

---

### **5️⃣ Spring AOP（面向切面编程）💡**
✅ **AOP 作用**：
- **不修改原代码的情况下增强功能**，如 **日志、事务管理、权限校验**。  
- **Spring AOP 基于动态代理**：
  - **JDK 代理**（默认，要求类实现接口）。  
  - **CGLIB 代理**（无接口时，基于字节码生成子类）。  

✅ **AOP 术语**
| **术语** | **作用** |
|---|---|
| **切点（PointCut）** | 需要增强的方法（通过表达式定义） |
| **通知（Advice）** | 具体增强逻辑 |
| **切面（Aspect）** | **切点 + 通知** 的结合 |
| **织入（Weaving）** | 将切面与目标对象结合的过程 |

✅ **通知类型**
| **通知** | **执行时机** |
|---|---|
| `@Before` | 方法执行前 |
| `@After` | 方法执行后 |
| `@AfterReturning` | 方法返回后 |
| `@AfterThrowing` | 方法抛出异常后 |
| `@Around` | 环绕通知，可控制方法执行 |

✅ **AOP 失效场景**
- **类内部方法调用（`this` 调用）**：AOP 依赖动态代理，而 `this` 调用不会经过代理对象。  
- **`private` / `final` 方法**：不能被代理。  

---

### **6️⃣ Spring 事务管理（`@Transactional`）🔥**
✅ **Spring 事务的作用**
- **保证多条 SQL 操作要么全部成功，要么全部失败**，防止数据不一致。

✅ **事务传播机制**
| **传播行为** | **作用** |
|---|---|
| `REQUIRED` | 默认值，**如果有事务就加入，没有就新建** |
| `REQUIRES_NEW` | **新建事务，不管是否已有事务** |
| `NESTED` | **嵌套事务，外部回滚，内部回滚** |
| `SUPPORTS` | **支持事务，没有事务就普通执行** |
| `MANDATORY` | **必须在已有事务下运行，否则报错** |
| `NOT_SUPPORTED` | **不支持事务，挂起当前事务** |
| `NEVER` | **不支持事务，已有事务时报错** |

✅ **事务失效场景**
✔ **方法不是 `public`**（`@Transactional` 只能作用在 `public` 方法上）。  
✔ **方法被 `this` 调用**（不会经过代理）。  
✔ **异常被 `catch` 捕获**（事务不会回滚）。  
✔ **数据库引擎不支持事务**（如 `MyISAM`）。  

---

### **7️⃣ Spring 循环依赖 💡**
✅ **Spring 如何解决循环依赖？**
- **三级缓存机制**：
  1. **一级缓存**：存完整 Bean（单例池）。  
  2. **二级缓存**：存未初始化的 Bean。  
  3. **三级缓存**：存 Bean 工厂（解决 AOP 代理问题）。  

✅ **为什么不用两级缓存？**
- **如果 Bean 需要 AOP 代理，初始化后才能生成代理对象**，而 **属性注入发生在初始化前**，所以用 **三级缓存存代理对象的工厂**。  

✅ **无法解决的情况**
- **构造器注入的循环依赖**（因为构造器在属性注入前执行）。  

---

### **8️⃣ Spring Boot 自动装配（`@EnableAutoConfiguration`）🔥**
✅ **Spring Boot 启动流程**
✔ **SpringApplication.run()** 生成 `SpringApplication` 实例，创建监听器。  
✔ **加载 `META-INF/spring.factories` 自动配置类**（`@EnableAutoConfiguration`）。  
✔ **过滤不满足 `@ConditionalOnXxx` 条件的配置**。  
✔ **启动 IoC 容器，完成 Bean 依赖注入**。  

✅ **自定义 Starter**
✔ **创建 `META-INF/spring.factories`**  
✔ **使用 `@ConditionalOnProperty` 等注解控制自动装配**  
✔ **编写自动配置类 `@Configuration`**  

---

### **🔥 总结**
1️⃣ **Spring 核心：IoC（依赖注入）+ AOP（切面编程）**。  
2️⃣ **Bean 作用域、生命周期、线程安全问题**。  
3️⃣ **Spring 事务管理（`@Transactional`）及事务传播机制**。  
4️⃣ **Spring AOP 代理模式，及拦截失效原因**。  
5️⃣ **Spring Boot 自动装配原理**。