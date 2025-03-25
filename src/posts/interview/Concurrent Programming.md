---
icon: pen-to-square
date: 2024-03-25
category:
  - 面试
tag:
  - 并发
---
# 并发
## **💠并发编程知识总结**

---

### **✅ 悲观锁与乐观锁 💡**

🔹 **悲观锁**  
- 假设最坏情况，每次修改共享资源时都会加锁，阻塞其他线程访问，直到锁被释放。  
- **典型实现**：`synchronized`、`ReentrantLock`  
- **缺点**：
  - 线程竞争激烈时，频繁的线程唤醒和阻塞会导致 **上下文切换开销大**。
  - 可能引发 **死锁**。  
- **适用场景**：写多、竞争激烈的场景，锁的开销较为固定。

🔹 **乐观锁**  
- 假设最好的情况，不加锁，仅在提交时检查资源是否被修改。  
- **实现方式**：
  - **版本号法**：数据库表中增加 `version` 字段，修改前检查 `version` 是否匹配。
  - **CAS（比较并交换）**：涉及三个操作数 `（内存值、预期值、新值）`，如果 `预期值 == 内存值`，则修改成功。  
- **CAS的底层**：
  - **Java层面**：`Unsafe` 类调用本地方法实现。
  - **操作系统层面**：基于 **CPU的原子指令**，利用 **缓存一致性协议** 保证原子操作。  
- **缺点**：
  - 并发修改冲突时，**失败重试消耗 CPU 资源大**。
  - **ABA 问题**（变量值回到了原值但实际经历了多次变化）。
- **适用场景**：读多写少、竞争较少的情况。  

---

### **✅ JMM 内存模型 💡**
💡 **JMM（Java Memory Model）** 规定了 Java 线程如何与主存和工作内存交互，解决 **原子性、可见性、有序性** 问题。

🔹 **原子性**（Atomicity）  
保证操作 **不可被中断**，要么全部执行，要么不执行。  
**实现方式**：
- `synchronized`、`ReentrantLock`
- `AtomicInteger` 等原子类

🔹 **可见性**（Visibility）  
保证线程对共享变量的修改对其他线程可见。  
**实现方式**：
- `volatile`
- `synchronized`
- `Lock` 的 `lock()` 和 `unlock()`

🔹 **有序性**（Orderliness）  
指令重排可能导致多线程问题。  
**解决方案**：
- `volatile`
- `synchronized`
- `happens-before` 规则（JMM 规定的执行顺序规则）

⚠ **为什么需要 JMM？**  
- 解决 CPU **缓存一致性** 问题（MESI 协议）。
- 统一跨操作系统的内存访问规则。
- **屏蔽底层细节**，让 Java 程序员方便写并发安全代码。

---

### **✅ 线程池 💡💡💡**
🔹 **ThreadPoolExecutor** 的 **7 个核心参数**  
| 参数 | 作用 |
|---|---|
| **核心线程数** | 线程池的基础线程数量 |
| **最大线程数** | 任务队列满时能创建的最大线程数 |
| **任务队列** | 存储待执行的任务 |
| **线程存活时间** | 非核心线程的最大存活时间 |
| **时间单位** | 线程存活时间的单位 |
| **线程工厂** | 线程创建方式 |
| **拒绝策略** | 任务过载时的处理方式 |

🔹 **4 种拒绝策略**  
| 策略 | 作用 |
|---|---|
| **AbortPolicy** | 直接抛异常 |
| **CallerRunsPolicy** | 由调用线程执行任务 |
| **DiscardPolicy** | 直接丢弃任务 |
| **DiscardOldestPolicy** | 丢弃最老的任务 |

🔹 **常见线程池**
| 线程池 | 说明 |
|---|---|
| **FixedThreadPool** | 线程数固定，任务队列无界，可能导致 OOM |
| **SingleThreadExecutor** | 只有一个线程，类似 FixedThreadPool |
| **CachedThreadPool** | 核心线程数 0，最大 `Integer.MAX_VALUE`，可能创建过多线程 |
| **ScheduledThreadPool** | 定时任务线程池 |

⚠ **线程池最佳实践**
- **使用有界队列** 防止 OOM
- **不同业务使用不同线程池** 防止资源竞争
- **为线程命名** 方便排查问题
- **正确配置线程数量**：
  - **计算密集型**：`N + 1`（N = CPU 核数）
  - **I/O 密集型**：`2N`
- **优雅关闭**：`shutdown()`、`awaitTermination()`

---

### **✅ AQS（抽象队列同步器）💡**
🔹 **AQS 的核心思想**：
- **state 变量**（`volatile int state`）表示锁状态。
- **FIFO 队列** 存储等待获取锁的线程。
- **CAS 机制** 保证线程安全。

🔹 **基于 AQS 的组件**
| 组件 | 作用 |
|---|---|
| **ReentrantLock** | 可重入锁 |
| **Semaphore** | 信号量 |
| **CountDownLatch** | 倒计时器 |
| **CyclicBarrier** | 循环屏障 |

---

### **✅ ThreadLocal 💡**
**作用**：为每个线程提供独立变量副本，避免多线程共享变量带来的并发问题。  

🔹 **原理**：
- `Thread` 类中有 `ThreadLocalMap` 变量，存储 `ThreadLocal` 实例及其值。
- **防止内存泄漏**：调用 `remove()` 方法释放 `ThreadLocal` 对象。

🔹 **InheritableThreadLocal**  
- 子线程会继承父线程 `ThreadLocal` 的值。

---

### **✅ CompletableFuture（异步编程）**
🔹 **核心方法**
| 方法 | 作用 |
|---|---|
| `supplyAsync()` | 执行异步任务（有返回值） |
| `runAsync()` | 执行异步任务（无返回值） |
| `thenApply()` | 处理计算结果并返回新值 |
| `thenCombine()` | 合并两个任务结果 |
| `allOf()` | 等所有任务完成 |
| `anyOf()` | 任意任务完成就返回 |

---

### **✅ 死锁 💡💡💡**
🔹 **死锁的 4 个必要条件**
1. **互斥**：资源不可共享
2. **占有并等待**：占有资源且等待额外资源
3. **不可抢占**：资源不可强制释放
4. **循环等待**：多个线程形成循环等待链

🔹 **避免死锁**
- **破坏循环等待**：按顺序获取资源
- **银行家算法** 进行资源预分配
- **死锁检测工具**（如 Arthas）

---

### **✅ synchronized vs ReentrantLock 💡**
| 特性 | `synchronized` | `ReentrantLock` |
|---|---|
| **底层实现** | **JVM** `monitorenter/monitorexit` | **AQS** |
| **锁类型** | 非公平锁 | 可选公平锁 |
| **可中断** | ❌ | ✅ |
| **超时获取锁** | ❌ | ✅ |
| **手动释放** | ❌ | ✅（必须 `unlock()`） |

---

### **✅ 线程安全方案 💡**
| 方案 | 方式 |
|---|---|
| **悲观锁** | `synchronized`、`ReentrantLock` |
| **乐观锁** | `AtomicInteger`、`CAS` |
| **并发容器** | `ConcurrentHashMap`、`CopyOnWriteArrayList` |
| **线程同步工具** | `Semaphore`、`CountDownLatch` |

---

### **✅ 面试必考：三个线程顺序打印 0-100**
💡 **基于 `synchronized + wait/notify`**：
```java
while (COUNT.get() % 3 != index) { LOCK.wait(); }
System.out.println("thread-" + index + ":" + COUNT.get());
COUNT.getAndIncrement();
LOCK.notifyAll();
```

---

💡 **总结**：多线程编程提升 **CPU 利用率**，但要权衡 **安全性与性能**，合理选择 **锁、线程池、AQS、CAS** 等工具！🚀