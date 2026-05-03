---
title: "Java Virtual Threads: Scaling to Millions of Concurrent Tasks"
description: "A deep dive into the architecture of Project Loom, exploring how virtual threads map to carrier threads and the OS."
pubDate: 2026-05-03
tags: ["java", "architecture", "scalability"]
complexity: "Medium"
---

import Mermaid from '../../components/Mermaid.astro';

## Introduction

Java 21 introduced Virtual Threads, a lightweight implementation of threads that dramatically reduces the effort of writing, maintaining, and observing high-throughput concurrent applications.

## The Architecture

Virtual threads are managed by the Java runtime rather than the OS. They are "mounted" onto platform threads (carrier threads) when they need to execute.

### Thread Mapping

<Mermaid>
sequenceDiagram
    participant V as Virtual Thread (Heap)
    participant C as Carrier Thread (Platform)
    participant OS as OS Thread
    
    Note over V: User Task Started
    V->>C: Mount (on execution)
    C->>OS: Execute instructions
    
    Note over V: Blocking I/O operation
    V->>C: Unmount (context saved to heap)
    C->>OS: Becomes free for other tasks
    
    Note over V: I/O completes
    V->>C: Re-mount (state restored)
    C->>OS: Continue execution
</Mermaid>

## Code Example (Java 21+)

Here is how you can create millions of virtual threads efficiently using the new `Executors` API:

```java
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10_000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(1000);
                    System.out.println("Task " + i + " completed by " + Thread.currentThread());
                    return i;
                });
            });
        } // executor.close() is called automatically, waiting for all tasks
    }
}
```

## Why it matters for Scalability

Unlike platform threads, virtual threads are cheap. You don't need to pool them; you simply create a new one for every task, allowing for a "thread-per-request" model that scales horizontally without the memory overhead of traditional threads.
