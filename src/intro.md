---
icon: circle-info
cover: /assets/images/cover3.jpg
---

# 个人简介
<div style="display: flex; align-items: center;">
    <div style="flex: 1; text-align: left;">
        <h1>马璐瑶</h1>
        <p>2004.03 求职意向：软件开发实习生</p>
        <div>
            <span>
                15733435475
            </span>
            ·
            <span>
                mly798789@163.com
            </span>
            ·
            <span>
                <a href="#">https://mly66.github.io/blog/</a>
            </span>
            ·
            <span>
                <a href="https://github.com/mly66">mly66</a>
            </span>
        </div>
    </div>
    <div style="flex: 0;">
        <img src="https://free-img.mofashi.ltd/5/2025/03/17/67d7c20cd1292.png" alt="icon.png" title="icon.png" style="max-width: 150px; height: auto;">
    </div>
</div>

## 教育经历

- 本科，河北石油职业技术大学，软件工程专业，2022.09~2026.7
- 绩点：3.5/4.0，年级前 5%     通过了 CET4 英语等级考试
- 计算机一级 计算机二级 英语四级 程序员技术资格 **国家励志奖学金** 数学建模竞赛省奖 校级一等奖学金

## 工作经历

- **长治市园中厦房地产开发有限公司  IT 部门，IT工程师，2023.06~2023.08**
   - 责任描述：
     1. 负责后台管理系统的公寓信息管理模块的开发，主要包含属性管理，公寓信息管理和房间管理
     2. 参与后台管理系统管理员的登录及身份认证开发
     3. 参与移动端系统当前登录用户个人中心的浏览历史、看房预约和租约管理开发设计
   - 技术描述：
     1. 使用Minio存储公寓和房间的图片信息
     2. 使用EasyCaptcha获取后台管理员登录的图片验证码，并使用Redis+Java-JWT完成身份认证功能
     3. 移动端系统使用SpringMVC的HandlerInterceptor拦截器完成登录用户的身份认证

## 项目经历

- **伴君如梦**

  *技术栈：SpringBoot、Mybatis、SpringCloud、Nginx、Gateway、OpenFeign、Nacos、ElasticSearch、MongoDB、Minio、Seata*

  1. **登录校验**：通过Spring AOP+ThreadLocal实现无侵入式鉴权，支持多服务用户信息透传，接口耗时降低40%（从25ms→15ms）；
  2. **缓存架构**：采用布隆过滤器（误判率<0.1%）+分布式锁+双缓存策略，解决专辑详情页缓存穿透/击穿问题，QPS提升至1.2万，缓存失效场景延迟从5s→200ms；
  3. **性能优化**：基于CompletableFuture实现专辑/声音/订单多服务数据并行加载，接口响应时间从800ms优化至220ms（压测数据）；
  4. **支付可靠性**：通过Seata AT模式+RabbitMQ延迟队列保障分布式事务，支付超时订单自动关闭，资损率下降98%，订单状态同步延迟<500ms；
  5. **创新设计**：首创播放进度MongoDB分片存储方案（Shard Key+TTL索引），支持亿级用户播放记录存储，查询性能较MySQL提升8倍。

## 技能清单

- 熟练掌握Java基础知识，包括面向对象、集合、IO、泛型等内容，熟悉Lambda表达式、Stream流、函数式接口等新特性
- 熟悉JVM，了解类加载机制、内存区域、JVM的调优、堆的垃圾回收机制、和部分垃圾回收器等
- 熟悉Java线程操作，了解Synchronized、Lock、线程池、CAS、AQS、线程安全的并发容器类等底层原理
- 熟悉Redis，理解RDB、AOF、Sentinel的工作机制并能灵活使用5种基本数据类型，了解Redisson工具，并了解Redis的缓存击穿、缓存穿透、缓存雪崩、缓存与数据库不一致等问题
- 熟悉MySQL引擎架构，锁的机制，包括MySQL的索引、事务、sql语句优化
- 熟悉RabbitMQ消息中间件技术，了解消息模型，RabbitMQ的消息确认机制和消息持久化机制，熟练使用延迟队列功能
- 熟悉使用Spring、SpringMVC、Mybatis、Mybatis-plus、SpringBoot、SpringCloud、SpringCloudAlibaba等主流框架
- 熟悉Linux操作系统常见操作指令，熟悉Docker的常用命令并能够用docker和Jenkins做项目部署，实现CI/CD功能
- 熟悉JavaScript、HTML、CSS、Ajax、jQuery、ElementUI、VUE等前端技术栈



## **个人评价**

- 工作主动，认真负责，具有较强的责任心和强烈的集体荣誉感，能够积极的面对并解决工作中的问题
- 思维严谨，有较强的学习及适应能力，对新技术有很强的好奇心
- 能加班、能出差，能快速融入团队