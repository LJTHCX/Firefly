---
title: AWC66-二分答案/状压DP
published: 2026-05-11
description: AWC66题解-solve4-补E
image: ./cover.jpg
tags: [算法训练,AtCoder,AWC]
category: 算法训练
draft: False
---

# AWC66

[Tasks - AtCoder Weekday Contest 0066 Beta](https://atcoder.jp/contests/awc0066/tasks "Tasks - AtCoder Weekday Contest 0066 Beta")

AB的题意很长，像是做阅读理解，CD倒是很板子，评价说CD比AB容易，E赛时写的DFS，当然是TLE了，正解是状压DP

<details> <summary>A-模拟</summary>

题意是对于给定序列a以及给定的操作序列b，对于每个bi将a\[i]的值加到a\[i+1]上，如果i+1 > n，则置零

```python title="模拟"
n,q = map(int,input().split())
a = list(map(int,input().split()))+[0]
for _ in range(q):
    b = int(input()) - 1
    a[b+1] += a[b]
    a[b] = 0
print(*a[:-1])

```


</details>
<details> <summary>B-模拟</summary>

雷霆题目，题目描述像是写小作文，理解起来非常困难，大致的题意如下：

- 有 N 部手机，初始电量 Ai。
- 阈值 L：电量 ≤ L 的手机立即关机（无法使用）。
- 在时间 0，可以选择至多 K 部**当前开机**的手机连接到移动电池，这些手机在接下来的 Y 秒内电量**不会减少**。
- 时间从 1 到 Y，每秒：
  1. 未连接电池且仍开机的手机，电量减少 1。
  2. 电量变得 ≤ L 的手机立即关机（无法再使用）。
- 问：Y 秒后，最多还有多少手机开机（包括连接电池的）？

考虑三种情况：

初始电量 ≤L，不予考虑

初始电量>L+Y，不连接也能在最后可以使用

其余情况，不充电会关机

```python title="模拟"
  N, L, K, Y = map(int, input().split())
  A = list(map(int, input().split()))
  normal = []
  need = []
  for a in A:
      if a <= L:
          continue
      if a > L + Y:
          normal.append(a)
      else:
          need.append(a)
  # 优先连接必须连的
  connect = min(K, len(need))
  ans = len(normal) + connect
  print(ans)
```


</details>
<details> <summary>C-差分</summary>
按照题意差分即可

```python title="差分"
n,q = map(int,input().split())
w = [0] + [0] + list(map(int,input().split())) + [0]
a = [0]*(n+3)
for _ in range(q):
    l,r,d = map(int,input().split())
    a[l] += d
    a[r+1] -= d
pre = [0]*(n+3)
ans = 0
for i in range(n+2):
    pre[i+1] = pre[i] + a[i]
    if 2 <= i <= n+1 and pre[i] - w[i] >= 0:
        ans += 1
print(ans)

```

</details>
<details> <summary>D-二分答案</summary>


经典的二分答案求最小化最大值

```python title="二分答案"
n,k = map(int,input().split())
a = list(map(int,input().split()))
def check(mid):
    cur = 0
    cnt = 1
    for x in a:
        if x > mid:
            return False
        if cur + x > mid:
            cnt += 1
            cur = x
        else:
            cur += x
    return cnt <= k

left =  max(a) - 1
right = sum(a)
while left + 1 < right:
    mid = (left + right) // 2
    if check(mid):
        right = mid
    else:
        left = mid
print(right)
```

</details>
<details> <summary>E-状压DP</summary>
计算从 S 到 T 的所有简单路径上每条路径的顶点权重之和，并求得平均值

```python title="gpt5.3"
import sys

def main():
    input = sys.stdin.readline

    N, M, S, T = map(int, input().split())
    S -= 1
    T -= 1

    c = [int(input()) for _ in range(N)]

    adj = [0] * N
    for _ in range(M):
        u, v = map(int, input().split())
        u -= 1
        v -= 1
        adj[u] |= 1 << v
        adj[v] |= 1 << u

    size = 1 << N

    # dp_count[mask][v]: number of simple paths from S to v using exactly vertices in mask
    # dp_sum[mask][v]: total score sum over those paths
    dp_count = [[0] * N for _ in range(size)]
    dp_sum = [[0] * N for _ in range(size)]

    start_mask = 1 << S
    dp_count[start_mask][S] = 1
    dp_sum[start_mask][S] = c[S]

    for mask in range(size):
        if (mask & start_mask) == 0:
            continue
        for v in range(N):
            cnt = dp_count[mask][v]
            if cnt == 0:
                continue
            sm = dp_sum[mask][v]

            nxt = adj[v] & (~mask)
            while nxt:
                lsb = nxt & -nxt
                u = lsb.bit_length() - 1
                nmask = mask | lsb
                dp_count[nmask][u] += cnt
                dp_sum[nmask][u] += sm + cnt * c[u]
                nxt ^= lsb

    total_count = 0
    total_sum = 0
    bit_t = 1 << T
    for mask in range(size):
        if (mask & bit_t) == 0:
            continue
        total_count += dp_count[mask][T]
        total_sum += dp_sum[mask][T]

    ans = total_sum / total_count
    print("{:.10f}".format(ans))

if __name__ == "__main__":
    main()

```
