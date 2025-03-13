---
icon: pen-to-square
date: 2024-03-13
category:
  - 面试
tag:
  - MyBatis
---
# MyBatis
## **🔥 MyBatis 面试八股文**  

---

### **1️⃣ 什么是 MyBatis？📌**
✅ **MyBatis 是一款优秀的持久层框架**，它 **支持 SQL 语句的映射、动态 SQL 生成、缓存机制**，简化了 JDBC 操作，避免了冗长的 SQL 代码。  

✅ **MyBatis 不是全 ORM 框架**，它只负责 **SQL 语句的执行 & 结果映射**，不像 Hibernate 那样完全自动化。

---

### **2️⃣ MyBatis 的优缺点 🚀**
✅ **优点**：
✔️ **灵活性高**：支持手写 SQL，适用于复杂查询。  
✔️ **性能优越**：SQL 由开发者编写，避免了 Hibernate 级联查询带来的性能问题。  
✔️ **支持动态 SQL**：可用 `if`、`choose`、`where` 等标签动态拼接 SQL。  
✔️ **缓存机制**：提供 **一级缓存 & 二级缓存**，提高查询效率。  

❌ **缺点**：
- **SQL 需手写**，SQL 语句需要自己管理，维护较复杂。  
- **不支持自动建表**，不像 JPA/Hibernate，无法自动创建数据库表。  
- **学习成本较高**，需要掌握 XML 语法和 SQL 语句。

---

### **3️⃣ MyBatis vs JPA（Hibernate）📊**
| **对比项** | **MyBatis** | **JPA（Hibernate）** |
|---|---|---|
| **SQL 控制** | 开发者手写 SQL，控制精准 | 自动生成 SQL，简化开发 |
| **查询性能** | SQL 可优化，性能高 | 可能生成复杂 SQL，性能受影响 |
| **学习成本** | 需要掌握 SQL 和 XML | 简单易学 |
| **缓存机制** | 一级缓存 & 二级缓存 | 内置缓存优化查询 |
| **维护成本** | SQL 维护量大 | 面向对象编程，易维护 |
| **事务管理** | 依赖 Spring 管理事务 | 内置事务管理 |

✅ **结论**：  
**查询复杂、追求高性能，选 MyBatis；**  
**CRUD 简单、希望自动化，选 JPA（Hibernate）。**

---

### **4️⃣ MyBatis 的核心组件 🛠**
✅ **SqlSessionFactory**：  
- 负责创建 **SqlSession** 实例。  
- **管理数据库连接、事务、缓存等**。

✅ **SqlSession**：  
- **执行 SQL 语句**，管理事务（增删改查）。  
- **获取 Mapper**（MyBatis 通过 `Mapper` 接口操作数据库）。

✅ **Mapper（映射器）**：  
- **存放 SQL 语句的 XML 文件** 或者 **注解 SQL**（`@Select`、`@Insert`）。  
- 关联 `Mapper.xml`，实现 **Java 方法 → SQL 语句的映射**。

✅ **配置文件（mybatis-config.xml）**：  
- **管理全局配置**（环境、数据源、别名、缓存策略等）。

✅ **映射文件（XXXMapper.xml）**：  
- **定义 SQL 语句**，提供 CRUD 操作。

---

### **5️⃣ MyBatis 工作流程 🔄**
1️⃣ **读取 MyBatis 配置文件**（`mybatis-config.xml`），创建 `SqlSessionFactory`。  
2️⃣ **通过 `SqlSessionFactory` 获取 `SqlSession`**，建立数据库连接。  
3️⃣ **调用 Mapper 执行 SQL**，查询数据。  
4️⃣ **返回结果，MyBatis 解析 SQL 并封装为对象**。  
5️⃣ **关闭 `SqlSession`**，释放资源。

---

### **6️⃣ MyBatis 的一级缓存 & 二级缓存 🔥**
✅ **一级缓存（默认开启）**：
- 作用范围：**SqlSession 级别**（同一个 `SqlSession` 内部共享）。  
- **特点**：
  - 查询相同 SQL **不会再次访问数据库**，直接从缓存取。  
  - `SqlSession.close()` 后缓存失效。  

✅ **二级缓存（手动开启）**：
- 作用范围：**Mapper 级别（跨 SqlSession 共享）**。  
- **特点**：
  - **数据存储在 `namespace` 级别的缓存中**，不同 `SqlSession` 共享。  
  - 需在 `Mapper.xml` 添加 `<cache />` 手动开启。  
  - **事务提交后才会缓存数据**（不会立即写入缓存）。

---

### **7️⃣ MyBatis 如何处理懒加载（延迟加载）？⏳**
✅ **懒加载（Lazy Loading）**：只有 **真正需要用到数据时才会加载**，提高查询效率。  
✅ **开启方式**：
```xml
<setting name="lazyLoadingEnabled" value="true"/>
<setting name="aggressiveLazyLoading" value="false"/>
```
✅ **默认情况下**，MyBatis 只会**对关联对象（如 `List<User>`）进行懒加载**，**基本数据类型默认立即加载**。

---

### **8️⃣ MyBatis 动态 SQL（灵活拼接 SQL 语句）📌**
✅ **动态 SQL** 作用：根据不同参数 **动态生成 SQL**，避免 `if-else` 拼接字符串的方式，提高代码可读性。

✅ **常用标签**：
| **标签** | **作用** |
|---|---|
| `<if>` | **条件判断**（`if test="id != null"`） |
| `<choose>` / `<when>` / `<otherwise>` | **类似 `switch-case` 语句** |
| `<where>` | **自动去掉 `where` 后多余的 `AND`** |
| `<set>` | **用于 `UPDATE` 语句，去掉 `SET` 后多余 `,`** |
| `<foreach>` | **用于 `IN` 语句遍历数组 / List** |

✅ **示例**：
```xml
<select id="getUserByCondition" resultType="User">
    SELECT * FROM user
    <where>
        <if test="username != null">AND username = #{username}</if>
        <if test="age != null">AND age = #{age}</if>
    </where>
</select>
```

---

### **9️⃣ MyBatis 中 `#{} `和 `${}` 的区别 ❓**
| **对比项** | **#{}（安全）** | **${}（不安全）** |
|---|---|---|
| **SQL 解析** | **占位符**，使用 `PreparedStatement` 预编译 | **直接拼接 SQL**，容易 SQL 注入 |
| **SQL 语法** | `WHERE id = #{id}` | `WHERE id = ${id}` |
| **适用场景** | **安全插入参数** | **动态表名 / 列名** |

✅ **建议：大部分场景使用 `#{}`，避免 SQL 注入！**

---

### **🔟 MyBatis 中 `resultMap` 和 `resultType`**
✅ **`resultType`（简单）**：
- 适用于 **查询结果和 Java 类字段名一致**。  
- 例如：
```xml
<select id="getUser" resultType="com.example.User">
    SELECT id, name, age FROM user
</select>
```

✅ **`resultMap`（复杂映射）**：
- **用于字段名与数据库不匹配的情况**（如 `user_name -> userName`）。
- 例如：
```xml
<resultMap id="UserResultMap" type="User">
    <id column="id" property="id"/>
    <result column="user_name" property="userName"/>
</resultMap>

<select id="getUser" resultMap="UserResultMap">
    SELECT id, user_name FROM user
</select>
```

---

### **💡 MyBatis 进阶问题**
✅ **MyBatis 如何实现动态数据源切换？**  
- **基于 `AbstractRoutingDataSource` 结合 AOP 实现数据源动态切换**。  
- **使用 `ThreadLocal` 记录当前线程数据源信息**。

✅ **MyBatis 如何实现分页？**  
- **两种方式**：
  - **使用 `RowBounds`（内存分页，不推荐）**。
  - **使用数据库 `limit` 分页（推荐）**：
  ```xml
  SELECT * FROM user LIMIT #{offset}, #{pageSize}
  ```

✅ **MyBatis 插件原理？**  
- **拦截 `Executor`、`StatementHandler`、`ResultSetHandler` 等核心组件**，实现 **SQL 监控、日志打印、自动分页**。

---

### **🔥 总结**
1️⃣ MyBatis 是 **SQL 映射框架**，支持**手写 SQL & 高性能查询**。  
2️⃣ **一级缓存 & 二级缓存** 提高查询效率，但使用需谨慎。  
3️⃣ **动态 SQL** 通过 `<if>`、`<foreach>` 等标签提高灵活性。  
4️⃣ **插件机制** 可用于**拦截 SQL、分页、日志等功能**。