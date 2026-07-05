---
title: ABC465-①C-双端队列②D-最近公共祖先③E-数位DP
published: 2026-07-05
description: ABC465
image: ./cover.jpg
tags: [训练,AtCoder,ABC]
category: AtCoder
draft: False
---

# ABC465-①C-双端队列②D-最近公共祖先③E-数位DP

[AtCoder Beginner Contest 465 - AtCoder](https://atcoder.jp/contests/abc465 "AtCoder Beginner Contest 465 - AtCoder")

[https://www.wolai.com/o1pzNhXkSre3n5N6EUSikW](https://www.wolai.com/o1pzNhXkSre3n5N6EUSikW "https://www.wolai.com/o1pzNhXkSre3n5N6EUSikW")

### C-双端队列

#### 题意

给你一个整数 $N$ 和一个长度为 $N$ 的由 `o` 和 `x` 组成的字符串 $S$ 。

有一个长度为 $N$ 的整数序列 $A=(A_1,A_2,\ldots,A_N)$ 。最初为 $A=(1,2,\ldots,N)$ 。

依次对 $A$ 和 $k=1,2,\ldots,N$ 执行以下操作。

- 如果 $S_k=$ \`O则将 $A$ 的前 $k$ 项倒置。具体地说，将 $A$ 替换为 $(A_k,A_{k-1},\ldots,A_1,A_{k+1},A_{k+2},\ldots,A_N)$ 。
- 如果 $S_k=$ `x`，则什么也不做。

完成所有运算后，找出 $A$ 。

#### 双端队列

只关心当前前`k`个元素的部分

用`rev`标记反转状态

当遇到`"o"`时，切换`rev`的状态

当处理到第`k`个元素时，如果`rev = False`，新元素`k`追加到末尾；反之，插入到开头

对于最后的`rev`，如果`rev`为`True`，则反转整个pre

```python title="双端队列"
from collections import deque
n = int(input())
s = input()
# for i in range(n):
#     if s[i] == 'o':
#         a[:i+1] = a[:i+1][::-1]
# print(*a)
pre = deque()
ok = 0
for k in range(1,n+1):
    if ok:
        pre.appendleft(k)
    else:
        pre.append(k)
    if s[k-1] == 'o':
        ok ^= 1
if ok:
    ans = list(pre)[::-1]
else:
    ans = list(pre)
print(*ans)

```


### D-最近公共祖先

#### 题意

给你一个整数 $X,Y$ 和一个至少是 $2$ 的整数 $K$ 。

有一个变量 $x$ ，其初始值为 $x=X$ 。您可以对 $x$ 执行以下操作 0 次或多次：

- 选择一个满足 $\displaystyle \left\lfloor \frac xK \right\rfloor=y$ 或 $\displaystyle \left\lfloor \frac yK \right\rfloor=x$ 的整数 $y$ ，并将 $x$ 的值替换为 $y$ 。

这里， $\displaystyle \left\lfloor z \right\rfloor$ 被定义为实数 $z$ 不超过 $z$ 的最大整数。

求生成 $x=Y$ 所需的最小运算次数。在给定的限制条件下，可以证明总有一种方法可以在有限的运算次数内求出 $x=Y$ 。

给你 $T$ 个测试用例，请逐一求解。

#### 最近公共祖先LCA

在树中，两点间有且只有一条简单路径。  如果路径不经过它们的公共祖先，就必须在某个节点不走父节点方向而走子节点方向，这只会增加不必要的绕路。找到最低公共祖先后，两条向上的路径拼接起来，正是树上两节点间的唯一最短路径。

从 `cur = X` 开始，不断执行 `cur //= K`，直到 `cur == 0`

用字典 `ans` 记录路径上每个节点到 `X` 的距离 `d`

从 `cur = Y`，`d = 0` 开始，同样不断执行 `cur //= K`。

每一步检查当前 `cur` 是否已经存在于 `ans` 字典中。

一旦在 `ans` 中找到 `cur`，说明找到了 `X` 向上路径和 `Y` 向上路径的**最低公共祖先**。

此时最短距离就是 `d + ans[cur]`（从 `X` 到祖先的距离 + 从 `Y` 到祖先的距离）。

```python title="LCA"
for _ in range(int(input())):
    x,y,k = map(int,input().split())
    if x == y:
        print(0)
    else:
        ans = {}
        cur = x
        d = 0
        while True:
            ans[cur] = d
            if cur == 0:
                break
            cur //= k
            d += 1
        cur = y
        d = 0
        while True:
            if cur in ans:
                print(d + ans[cur])
                break
            cur //= k
            d += 1

```


```python title="LCA"
for _ in range(int(input())):
    x, y, k = map(int, input().split())
    ans = 0
    while x != y:
        if x < y:
            x, y = y, x
        x //= k
        ans += 1
    print(ans)

```


### E-数位DP

#### 题目

求模为 $998244353$ 的整数 $x$ 与 $1 \leq x \leq N$ 中，满足以下三个条件中**个**的整数个数。

- $x$ 是 $3$ 的倍数。
- $x$ 的十进制表示包含 `3`。
- $x$ 的十进制表示恰好使用了三个不同的数字。

这里，整数的十进制表示不应有不必要的前导 "0"。

#### 数位DP

```python title="数位DP"
MOD = 998244353

def solve():
    s = input().strip()
    n = len(s)
    
    # dp[i][bi][mi][li]
    dp = [[[[0] * 2 for _ in range(3)] for _ in range(1 << 10)] for _ in range(n + 1)]
    dp[0][0][0][0] = 1
    
    for i in range(n):
        si = int(s[i])
        
        for bi in range(1 << 10):
            for mi in range(3):
                for li in range(2):
                    if dp[i][bi][mi][li] == 0:
                        continue
                    val = dp[i][bi][mi][li]
                    
                    max_d = 9 if li == 1 else si
                    for d in range(max_d + 1):
                        # 处理前导零
                        if bi == 0 and d == 0:
                            bx = 0
                        else:
                            bx = bi | (1 << d)
                        mx = (mi * 10 + d) % 3
                        lx = li or (d < si)
                        dp[i + 1][bx][mx][lx] = (dp[i + 1][bx][mx][lx] + val) % MOD
    
    ans = 0
    for bi in range(1, 1 << 10):  # bi=0 对应数字 0，排除
        for mi in range(3):
            for li in range(2):
                cnt = dp[n][bi][mi][li]
                if cnt == 0:
                    continue
                
                cond = 0
                # 条件1：恰好三个不同数字
                if bi.bit_count() == 3:
                    cond += 1
                # 条件2：包含数字 3
                if bi & (1 << 3):
                    cond += 1
                # 条件3：是 3 的倍数
                if mi == 0:
                    cond += 1
                
                if cond == 1:
                    ans = (ans + cnt) % MOD
    
    print(ans)

if __name__ == "__main__":
    solve()
```


```c++ title="数位DP"
#include <iostream>
using std::cin;
using std::cout;
using std::cerr;
using std::endl;
#include <vector>
using std::vector;
#include <string>
using std::string;
using std::to_string;
#include <bit>
using std::popcount;

typedef long long int ll;

const ll FOD = 998244353;

string s;

ll dp[505][1 << 10][3][2];
void solve() {
  // init dp[0]
  for (ll bi = 0; bi < (1<<10); bi++) {
    for (ll mi = 0; mi < 3; mi++) {
      for (ll li = 0; li < 2; li++) {
        dp[0][bi][mi][li] = 0;
      }
    }
  }
  dp[0][0][0][0] = 1;
  
  for (ll i = 0; i < s.size(); i++) {
    ll si = (s[i] - '0');

    // init dp[i+1]
    for (ll bi = 0; bi < (1<<10); bi++) {
      for (ll mi = 0; mi < 3; mi++) {
        for (ll li = 0; li < 2; li++) {
          dp[i+1][bi][mi][li] = 0;
        }
      }
    }

    // dp[i] -> dp[i+1]
    for (ll bi = 0; bi < (1<<10); bi++) {
      for (ll mi = 0; mi < 3; mi++) {
        // unroll loop for li
        for (ll d = 0; d <= 9; d++) {
          ll bx = ((bi == 0 && d == 0) ? 0 : (bi | (1LL << d)));
          ll mx = (mi * 10 + d) % 3;
          // li 0
          if (d <= si) {
            dp[i+1][bx][mx][(d == si) ? 0 : 1] += dp[i][bi][mi][0];
          }
          dp[i+1][bx][mx][1] += dp[i][bi][mi][1];
        }
      }
    }

    // modulo
    for (ll bi = 0; bi < (1<<10); bi++) {
      for (ll mi = 0; mi < 3; mi++) {
        for (ll li = 0; li < 2; li++) {
          dp[i+1][bi][mi][li] %= FOD;
        }
      }
    }
  }

  // dp[n] -> ans
  ll ans = 0;
  for (ll bi = 1; bi < (1<<10); bi++) {
    for (ll mi = 0; mi < 3; mi++) {
      for (ll li = 0; li < 2; li++) {
        ll cond = 0;
        if (popcount((uint64_t)bi) == 3) cond++;
        if (bi & (1LL << 3)) cond++;
        if (mi == 0) cond++;

        if (cond == 1) {
          ans += dp[s.size()][bi][mi][li];
        }
      }
    }
  }
  ans %= FOD;

  cout << ans << "\n";
}

int main (void) {
  std::cin.tie(nullptr);
  std::ios_base::sync_with_stdio(false);

  cin >> s;
  
  solve();

  return 0;
}

```
