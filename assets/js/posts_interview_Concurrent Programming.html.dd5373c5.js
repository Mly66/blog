"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[1080],{6262:(t,s)=>{s.A=(t,s)=>{const n=t.__vccOpts||t;for(const[t,r]of s)n[t]=r;return n}},8598:(t,s,n)=>{n.r(s),n.d(s,{comp:()=>o,data:()=>i});var r=n(641);const e={},o=(0,n(6262).A)(e,[["render",function(t,s){return(0,r.uX)(),(0,r.CE)("div",null,s[0]||(s[0]=[(0,r.Fv)('<h1 id="并发" tabindex="-1"><a class="header-anchor" href="#并发"><span>并发</span></a></h1><h2 id="💠并发编程知识总结" tabindex="-1"><a class="header-anchor" href="#💠并发编程知识总结"><span><strong>💠并发编程知识总结</strong></span></a></h2><hr><h3 id="✅-悲观锁与乐观锁-💡" tabindex="-1"><a class="header-anchor" href="#✅-悲观锁与乐观锁-💡"><span><strong>✅ 悲观锁与乐观锁 💡</strong></span></a></h3><p>🔹 <strong>悲观锁</strong></p><ul><li>假设最坏情况，每次修改共享资源时都会加锁，阻塞其他线程访问，直到锁被释放。</li><li><strong>典型实现</strong>：<code>synchronized</code>、<code>ReentrantLock</code></li><li><strong>缺点</strong>： <ul><li>线程竞争激烈时，频繁的线程唤醒和阻塞会导致 <strong>上下文切换开销大</strong>。</li><li>可能引发 <strong>死锁</strong>。</li></ul></li><li><strong>适用场景</strong>：写多、竞争激烈的场景，锁的开销较为固定。</li></ul><p>🔹 <strong>乐观锁</strong></p><ul><li>假设最好的情况，不加锁，仅在提交时检查资源是否被修改。</li><li><strong>实现方式</strong>： <ul><li><strong>版本号法</strong>：数据库表中增加 <code>version</code> 字段，修改前检查 <code>version</code> 是否匹配。</li><li><strong>CAS（比较并交换）</strong>：涉及三个操作数 <code>（内存值、预期值、新值）</code>，如果 <code>预期值 == 内存值</code>，则修改成功。</li></ul></li><li><strong>CAS的底层</strong>： <ul><li><strong>Java层面</strong>：<code>Unsafe</code> 类调用本地方法实现。</li><li><strong>操作系统层面</strong>：基于 <strong>CPU的原子指令</strong>，利用 <strong>缓存一致性协议</strong> 保证原子操作。</li></ul></li><li><strong>缺点</strong>： <ul><li>并发修改冲突时，<strong>失败重试消耗 CPU 资源大</strong>。</li><li><strong>ABA 问题</strong>（变量值回到了原值但实际经历了多次变化）。</li></ul></li><li><strong>适用场景</strong>：读多写少、竞争较少的情况。</li></ul><hr><h3 id="✅-jmm-内存模型-💡" tabindex="-1"><a class="header-anchor" href="#✅-jmm-内存模型-💡"><span><strong>✅ JMM 内存模型 💡</strong></span></a></h3><p>💡 <strong>JMM（Java Memory Model）</strong> 规定了 Java 线程如何与主存和工作内存交互，解决 <strong>原子性、可见性、有序性</strong> 问题。</p><p>🔹 <strong>原子性</strong>（Atomicity）<br> 保证操作 <strong>不可被中断</strong>，要么全部执行，要么不执行。<br><strong>实现方式</strong>：</p><ul><li><code>synchronized</code>、<code>ReentrantLock</code></li><li><code>AtomicInteger</code> 等原子类</li></ul><p>🔹 <strong>可见性</strong>（Visibility）<br> 保证线程对共享变量的修改对其他线程可见。<br><strong>实现方式</strong>：</p><ul><li><code>volatile</code></li><li><code>synchronized</code></li><li><code>Lock</code> 的 <code>lock()</code> 和 <code>unlock()</code></li></ul><p>🔹 <strong>有序性</strong>（Orderliness）<br> 指令重排可能导致多线程问题。<br><strong>解决方案</strong>：</p><ul><li><code>volatile</code></li><li><code>synchronized</code></li><li><code>happens-before</code> 规则（JMM 规定的执行顺序规则）</li></ul><p>⚠ <strong>为什么需要 JMM？</strong></p><ul><li>解决 CPU <strong>缓存一致性</strong> 问题（MESI 协议）。</li><li>统一跨操作系统的内存访问规则。</li><li><strong>屏蔽底层细节</strong>，让 Java 程序员方便写并发安全代码。</li></ul><hr><h3 id="✅-线程池-💡💡💡" tabindex="-1"><a class="header-anchor" href="#✅-线程池-💡💡💡"><span><strong>✅ 线程池 💡💡💡</strong></span></a></h3><p>🔹 <strong>ThreadPoolExecutor</strong> 的 <strong>7 个核心参数</strong></p><table><thead><tr><th>参数</th><th>作用</th></tr></thead><tbody><tr><td><strong>核心线程数</strong></td><td>线程池的基础线程数量</td></tr><tr><td><strong>最大线程数</strong></td><td>任务队列满时能创建的最大线程数</td></tr><tr><td><strong>任务队列</strong></td><td>存储待执行的任务</td></tr><tr><td><strong>线程存活时间</strong></td><td>非核心线程的最大存活时间</td></tr><tr><td><strong>时间单位</strong></td><td>线程存活时间的单位</td></tr><tr><td><strong>线程工厂</strong></td><td>线程创建方式</td></tr><tr><td><strong>拒绝策略</strong></td><td>任务过载时的处理方式</td></tr></tbody></table><p>🔹 <strong>4 种拒绝策略</strong></p><table><thead><tr><th>策略</th><th>作用</th></tr></thead><tbody><tr><td><strong>AbortPolicy</strong></td><td>直接抛异常</td></tr><tr><td><strong>CallerRunsPolicy</strong></td><td>由调用线程执行任务</td></tr><tr><td><strong>DiscardPolicy</strong></td><td>直接丢弃任务</td></tr><tr><td><strong>DiscardOldestPolicy</strong></td><td>丢弃最老的任务</td></tr></tbody></table><p>🔹 <strong>常见线程池</strong></p><table><thead><tr><th>线程池</th><th>说明</th></tr></thead><tbody><tr><td><strong>FixedThreadPool</strong></td><td>线程数固定，任务队列无界，可能导致 OOM</td></tr><tr><td><strong>SingleThreadExecutor</strong></td><td>只有一个线程，类似 FixedThreadPool</td></tr><tr><td><strong>CachedThreadPool</strong></td><td>核心线程数 0，最大 <code>Integer.MAX_VALUE</code>，可能创建过多线程</td></tr><tr><td><strong>ScheduledThreadPool</strong></td><td>定时任务线程池</td></tr></tbody></table><p>⚠ <strong>线程池最佳实践</strong></p><ul><li><strong>使用有界队列</strong> 防止 OOM</li><li><strong>不同业务使用不同线程池</strong> 防止资源竞争</li><li><strong>为线程命名</strong> 方便排查问题</li><li><strong>正确配置线程数量</strong>： <ul><li><strong>计算密集型</strong>：<code>N + 1</code>（N = CPU 核数）</li><li><strong>I/O 密集型</strong>：<code>2N</code></li></ul></li><li><strong>优雅关闭</strong>：<code>shutdown()</code>、<code>awaitTermination()</code></li></ul><hr><h3 id="✅-aqs-抽象队列同步器-💡" tabindex="-1"><a class="header-anchor" href="#✅-aqs-抽象队列同步器-💡"><span><strong>✅ AQS（抽象队列同步器）💡</strong></span></a></h3><p>🔹 <strong>AQS 的核心思想</strong>：</p><ul><li><strong>state 变量</strong>（<code>volatile int state</code>）表示锁状态。</li><li><strong>FIFO 队列</strong> 存储等待获取锁的线程。</li><li><strong>CAS 机制</strong> 保证线程安全。</li></ul><p>🔹 <strong>基于 AQS 的组件</strong></p><table><thead><tr><th>组件</th><th>作用</th></tr></thead><tbody><tr><td><strong>ReentrantLock</strong></td><td>可重入锁</td></tr><tr><td><strong>Semaphore</strong></td><td>信号量</td></tr><tr><td><strong>CountDownLatch</strong></td><td>倒计时器</td></tr><tr><td><strong>CyclicBarrier</strong></td><td>循环屏障</td></tr></tbody></table><hr><h3 id="✅-threadlocal-💡" tabindex="-1"><a class="header-anchor" href="#✅-threadlocal-💡"><span><strong>✅ ThreadLocal 💡</strong></span></a></h3><p><strong>作用</strong>：为每个线程提供独立变量副本，避免多线程共享变量带来的并发问题。</p><p>🔹 <strong>原理</strong>：</p><ul><li><code>Thread</code> 类中有 <code>ThreadLocalMap</code> 变量，存储 <code>ThreadLocal</code> 实例及其值。</li><li><strong>防止内存泄漏</strong>：调用 <code>remove()</code> 方法释放 <code>ThreadLocal</code> 对象。</li></ul><p>🔹 <strong>InheritableThreadLocal</strong></p><ul><li>子线程会继承父线程 <code>ThreadLocal</code> 的值。</li></ul><hr><h3 id="✅-completablefuture-异步编程" tabindex="-1"><a class="header-anchor" href="#✅-completablefuture-异步编程"><span><strong>✅ CompletableFuture（异步编程）</strong></span></a></h3><p>🔹 <strong>核心方法</strong></p><table><thead><tr><th>方法</th><th>作用</th></tr></thead><tbody><tr><td><code>supplyAsync()</code></td><td>执行异步任务（有返回值）</td></tr><tr><td><code>runAsync()</code></td><td>执行异步任务（无返回值）</td></tr><tr><td><code>thenApply()</code></td><td>处理计算结果并返回新值</td></tr><tr><td><code>thenCombine()</code></td><td>合并两个任务结果</td></tr><tr><td><code>allOf()</code></td><td>等所有任务完成</td></tr><tr><td><code>anyOf()</code></td><td>任意任务完成就返回</td></tr></tbody></table><hr><h3 id="✅-死锁-💡💡💡" tabindex="-1"><a class="header-anchor" href="#✅-死锁-💡💡💡"><span><strong>✅ 死锁 💡💡💡</strong></span></a></h3><p>🔹 <strong>死锁的 4 个必要条件</strong></p><ol><li><strong>互斥</strong>：资源不可共享</li><li><strong>占有并等待</strong>：占有资源且等待额外资源</li><li><strong>不可抢占</strong>：资源不可强制释放</li><li><strong>循环等待</strong>：多个线程形成循环等待链</li></ol><p>🔹 <strong>避免死锁</strong></p><ul><li><strong>破坏循环等待</strong>：按顺序获取资源</li><li><strong>银行家算法</strong> 进行资源预分配</li><li><strong>死锁检测工具</strong>（如 Arthas）</li></ul><hr><h3 id="✅-synchronized-vs-reentrantlock-💡" tabindex="-1"><a class="header-anchor" href="#✅-synchronized-vs-reentrantlock-💡"><span><strong>✅ synchronized vs ReentrantLock 💡</strong></span></a></h3><p>| 特性 | <code>synchronized</code> | <code>ReentrantLock</code> | |---|---| | <strong>底层实现</strong> | <strong>JVM</strong> <code>monitorenter/monitorexit</code> | <strong>AQS</strong> | | <strong>锁类型</strong> | 非公平锁 | 可选公平锁 | | <strong>可中断</strong> | ❌ | ✅ | | <strong>超时获取锁</strong> | ❌ | ✅ | | <strong>手动释放</strong> | ❌ | ✅（必须 <code>unlock()</code>） |</p><hr><h3 id="✅-线程安全方案-💡" tabindex="-1"><a class="header-anchor" href="#✅-线程安全方案-💡"><span><strong>✅ 线程安全方案 💡</strong></span></a></h3><table><thead><tr><th>方案</th><th>方式</th></tr></thead><tbody><tr><td><strong>悲观锁</strong></td><td><code>synchronized</code>、<code>ReentrantLock</code></td></tr><tr><td><strong>乐观锁</strong></td><td><code>AtomicInteger</code>、<code>CAS</code></td></tr><tr><td><strong>并发容器</strong></td><td><code>ConcurrentHashMap</code>、<code>CopyOnWriteArrayList</code></td></tr><tr><td><strong>线程同步工具</strong></td><td><code>Semaphore</code>、<code>CountDownLatch</code></td></tr></tbody></table><hr><h3 id="✅-面试必考-三个线程顺序打印-0-100" tabindex="-1"><a class="header-anchor" href="#✅-面试必考-三个线程顺序打印-0-100"><span><strong>✅ 面试必考：三个线程顺序打印 0-100</strong></span></a></h3><p>💡 <strong>基于 <code>synchronized + wait/notify</code></strong>：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> %</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> !=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> index) { </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">LOCK</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wait</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> }</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;thread-&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> index </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">());</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">COUNT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getAndIncrement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">LOCK</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">notifyAll</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>💡 <strong>总结</strong>：多线程编程提升 <strong>CPU 利用率</strong>，但要权衡 <strong>安全性与性能</strong>，合理选择 <strong>锁、线程池、AQS、CAS</strong> 等工具！🚀</p>',64)]))}]]),i=JSON.parse('{"path":"/posts/interview/Concurrent%20Programming.html","title":"并发","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-03-25T00:00:00.000Z","category":["面试"],"tag":["并发"],"description":"并发 💠并发编程知识总结 ✅ 悲观锁与乐观锁 💡 🔹 悲观锁 假设最坏情况，每次修改共享资源时都会加锁，阻塞其他线程访问，直到锁被释放。 典型实现：synchronized、ReentrantLock 缺点： 线程竞争激烈时，频繁的线程唤醒和阻塞会导致 上下文切换开销大。 可能引发 死锁。 适用场景：写多、竞争激烈的场景，锁的开销较为固定。 🔹...","head":[["meta",{"property":"og:url","content":"https://github.com/Mly66/blog/posts/interview/Concurrent%20Programming.html"}],["meta",{"property":"og:site_name","content":"马瑶瑶瑶瑶瑶"}],["meta",{"property":"og:title","content":"并发"}],["meta",{"property":"og:description","content":"并发 💠并发编程知识总结 ✅ 悲观锁与乐观锁 💡 🔹 悲观锁 假设最坏情况，每次修改共享资源时都会加锁，阻塞其他线程访问，直到锁被释放。 典型实现：synchronized、ReentrantLock 缺点： 线程竞争激烈时，频繁的线程唤醒和阻塞会导致 上下文切换开销大。 可能引发 死锁。 适用场景：写多、竞争激烈的场景，锁的开销较为固定。 🔹..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-25T02:50:16.000Z"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:published_time","content":"2024-03-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-25T02:50:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"并发\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-25T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-25T02:50:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Mly\\",\\"url\\":\\"https://mly66.github.io/blog/\\"}]}"]]},"headers":[{"level":2,"title":"💠并发编程知识总结","slug":"💠并发编程知识总结","link":"#💠并发编程知识总结","children":[{"level":3,"title":"✅ 悲观锁与乐观锁 💡","slug":"✅-悲观锁与乐观锁-💡","link":"#✅-悲观锁与乐观锁-💡","children":[]},{"level":3,"title":"✅ JMM 内存模型 💡","slug":"✅-jmm-内存模型-💡","link":"#✅-jmm-内存模型-💡","children":[]},{"level":3,"title":"✅ 线程池 💡💡💡","slug":"✅-线程池-💡💡💡","link":"#✅-线程池-💡💡💡","children":[]},{"level":3,"title":"✅ AQS（抽象队列同步器）💡","slug":"✅-aqs-抽象队列同步器-💡","link":"#✅-aqs-抽象队列同步器-💡","children":[]},{"level":3,"title":"✅ ThreadLocal 💡","slug":"✅-threadlocal-💡","link":"#✅-threadlocal-💡","children":[]},{"level":3,"title":"✅ CompletableFuture（异步编程）","slug":"✅-completablefuture-异步编程","link":"#✅-completablefuture-异步编程","children":[]},{"level":3,"title":"✅ 死锁 💡💡💡","slug":"✅-死锁-💡💡💡","link":"#✅-死锁-💡💡💡","children":[]},{"level":3,"title":"✅ synchronized vs ReentrantLock 💡","slug":"✅-synchronized-vs-reentrantlock-💡","link":"#✅-synchronized-vs-reentrantlock-💡","children":[]},{"level":3,"title":"✅ 线程安全方案 💡","slug":"✅-线程安全方案-💡","link":"#✅-线程安全方案-💡","children":[]},{"level":3,"title":"✅ 面试必考：三个线程顺序打印 0-100","slug":"✅-面试必考-三个线程顺序打印-0-100","link":"#✅-面试必考-三个线程顺序打印-0-100","children":[]}]}],"git":{"createdTime":1742871016000,"updatedTime":1742871016000,"contributors":[{"name":"Mly66","email":"3127328609@qq.com","commits":1}]},"readingTime":{"minutes":4.29,"words":1286},"filePathRelative":"posts/interview/Concurrent Programming.md","localizedDate":"2024年3月25日","excerpt":"\\n<h2><strong>💠并发编程知识总结</strong></h2>\\n<hr>\\n<h3><strong>✅ 悲观锁与乐观锁 💡</strong></h3>\\n<p>🔹 <strong>悲观锁</strong></p>\\n<ul>\\n<li>假设最坏情况，每次修改共享资源时都会加锁，阻塞其他线程访问，直到锁被释放。</li>\\n<li><strong>典型实现</strong>：<code>synchronized</code>、<code>ReentrantLock</code></li>\\n<li><strong>缺点</strong>：\\n<ul>\\n<li>线程竞争激烈时，频繁的线程唤醒和阻塞会导致 <strong>上下文切换开销大</strong>。</li>\\n<li>可能引发 <strong>死锁</strong>。</li>\\n</ul>\\n</li>\\n<li><strong>适用场景</strong>：写多、竞争激烈的场景，锁的开销较为固定。</li>\\n</ul>","autoDesc":true}')}}]);