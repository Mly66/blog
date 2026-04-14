---
title: MyBatis
cover: /assets/images/cover1.jpg
icon: file
order: 3
category:
  - 使用指南
tag:
  - MyBatis
  - Java
  - ORM框架
  - 后端开发
author: Mr.Mly
date: 2024-11-01
sticky: true
star: true
footer: Mly
copyright: Mly
---

# MyBatis 完全指南

MyBatis 是一款优秀的持久层框架，用于简化 Java 应用程序与数据库之间的交互。它支持自定义 SQL、存储过程和高级映射，避免了几乎所有的 JDBC 代码和手动设置参数。

## 1. 核心特点

### 灵活的 SQL 控制

MyBatis 允许开发者直接编写 SQL 语句，提供最大的灵活性：

```xml
<!-- UserMapper.xml -->
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 基础查询 -->
    <select id="getUserById" resultType="User">
        SELECT id, username, email, create_time 
        FROM users 
        WHERE id = #{id}
    </select>
    
    <!-- 动态 SQL -->
    <select id="searchUsers" resultType="User">
        SELECT * FROM users
        <where>
            <if test="username != null">
                AND username LIKE CONCAT('%', #{username}, '%')
            </if>
            <if test="status != null">
                AND status = #{status}
            </if>
            <if test="startDate != null and endDate != null">
                AND create_time BETWEEN #{startDate} AND #{endDate}
            </if>
        </where>
        ORDER BY create_time DESC
    </select>
    
</mapper>
```

### 易于调试

MyBatis 可以将执行的 SQL 语句输出到日志中，方便调试：

```yaml
# application.yml
mybatis:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

```java
// Mapper 接口
public interface UserMapper {
    User getUserById(Long id);
    List<User> searchUsers(@Param("username") String username, 
                          @Param("status") Integer status);
}
```

## 2. 缓存机制

### 一级缓存（默认开启）

- 基于 `SqlSession` 的本地缓存
- 同一 `SqlSession` 中相同查询不会重复访问数据库

```java
// 一级缓存示例
SqlSession session1 = sqlSessionFactory.openSession();
UserMapper mapper1 = session1.getMapper(UserMapper.class);

User user1 = mapper1.getUserById(1L);  // 查询数据库
User user2 = mapper1.getUserById(1L);  // 从缓存获取，不查数据库

session1.clearCache();  // 清空一级缓存
```

### 二级缓存

- 基于 `namespace` 的全局缓存
- 多个 `SqlSession` 共享

```xml
<!-- 开启二级缓存 -->
<cache 
    eviction="LRU"           <!-- 回收策略：LRU -->
    flushInterval="60000"    <!-- 刷新间隔：60秒 -->
    size="512"               <!-- 最多缓存对象数 -->
    readOnly="true"/>        <!-- 是否只读 -->

<!-- 或者使用注解 -->
@CacheNamespace(implementation = MybatisRedisCache.class)
public interface UserMapper {
    // ...
}
```

| 缓存类型 | 作用域 | 生命周期 | 适用场景 |
|---------|--------|---------|---------|
| **一级缓存** | SqlSession | Session 关闭时失效 | 单会话重复查询 |
| **二级缓存** | Namespace | 应用级别 | 多会话共享数据 |

## 3. 高级映射

### 一对多映射

```xml
<!-- 用户和订单的一对多关系 -->
<resultMap id="UserWithOrders" type="User">
    <id property="id" column="user_id"/>
    <result property="username" column="username"/>
    <result property="email" column="email"/>
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
        <result property="status" column="order_status"/>
    </collection>
</resultMap>

<select id="getUserWithOrders" resultMap="UserWithOrders">
    SELECT 
        u.id AS user_id, u.username, u.email,
        o.id AS order_id, o.order_no, o.amount, o.status AS order_status
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE u.id = #{id}
</select>
```

### 多对多映射

```xml
<!-- 用户和角色的多对多关系 -->
<resultMap id="UserWithRoles" type="User">
    <id property="id" column="user_id"/>
    <result property="username" column="username"/>
    <collection property="roles" ofType="Role">
        <id property="id" column="role_id"/>
        <result property="roleName" column="role_name"/>
        <result property="description" column="role_desc"/>
    </collection>
</resultMap>

<select id="getUserWithRoles" resultMap="UserWithRoles">
    SELECT 
        u.id AS user_id, u.username,
        r.id AS role_id, r.role_name, r.role_desc
    FROM users u
    LEFT JOIN user_role ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.id = #{id}
</select>
```

## 4. 动态 SQL 详解

MyBatis 的强大特性之一是动态 SQL，可以根据条件生成不同的 SQL 语句：

### 常用标签

| 标签 | 功能 | 使用场景 |
|------|------|---------|
| `<if>` | 条件判断 | 可选查询条件 |
| `<choose>` | 多选一 | 类似 switch-case |
| `<where>` | 智能 WHERE | 自动去除多余 AND/OR |
| `<set>` | 智能 SET | 更新操作 |
| `<foreach>` | 循环遍历 | IN 查询、批量操作 |
| `<trim>` | 字符串处理 | 自定义前缀后缀 |

### 实战示例

```xml
<!-- 批量插入 -->
<insert id="batchInsert" parameterType="list">
    INSERT INTO users (username, email, status) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.username}, #{user.email}, #{user.status})
    </foreach>
</insert>

<!-- 动态更新 -->
<update id="updateUser" parameterType="User">
    UPDATE users
    <set>
        <if test="username != null">username = #{username},</if>
        <if test="email != null">email = #{email},</if>
        <if test="status != null">status = #{status},</if>
    </set>
    WHERE id = #{id}
</update>

<!-- 复杂条件查询 -->
<select id="findUsers" resultType="User">
    SELECT * FROM users
    <where>
        <choose>
            <when test="searchType == 'name'">
                username LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="searchType == 'email'">
                email LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <otherwise>
                1=1
            </otherwise>
        </choose>
        <if test="minAge != null">
            AND age >= #{minAge}
        </if>
        <if test="maxAge != null">
            AND age <= #{maxAge}
        </if>
    </where>
    LIMIT #{offset}, #{limit}
</select>
```

## 5. 最佳实践

### 分页查询

```java
// 使用 PageHelper 插件
PageHelper.startPage(pageNum, pageSize);
List<User> users = userMapper.searchUsers(keyword, status);
PageInfo<User> pageInfo = new PageInfo<>(users);

// 返回分页结果
{
    "total": 100,
    "pageNum": 1,
    "pageSize": 10,
    "pages": 10,
    "list": [...]
}
```

### 防止 SQL 注入

```xml
<!-- ✅ 安全：使用 #{ } 预编译 -->
<select id="getUser" resultType="User">
    SELECT * FROM users WHERE username = #{username}
</select>

<!-- ❌ 危险：使用 ${ } 直接拼接，可能导致 SQL 注入 -->
<select id="getUser" resultType="User">
    SELECT * FROM users WHERE username = '${username}'
</select>
```

**何时使用 `${}`？**
- 动态表名：`SELECT * FROM ${tableName}`
- 动态排序字段：`ORDER BY ${columnName}`
- 其他场景均应使用 `#{}`

---

> **总结**：MyBatis 以其灵活的 SQL 控制、简单的映射机制和强大的动态 SQL 功能，成为 Java 后端开发中最受欢迎的持久层框架之一。与 Hibernate 相比，它提供了更细粒度的 SQL 控制，适合复杂查询和性能优化场景。
