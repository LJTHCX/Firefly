---
title: "[算法训练] vp1076Div3-①B-贪心②C-贪心+前缀和③D-二分④E-完全背包DP"
published: 2026-07-29
description: 1076Div3
image: ./cover.jpg
tags: [算法训练,Codeforces,Div3,vp]
category: 算法训练
draft: False
---

# vp1076Div3-①B-贪心②C-贪心+前缀和③D-二分④E-完全背包DP

[Dashboard - Codeforces Round 1076 (Div. 3) - Codeforces](https://codeforces.com/contest/2193 "Dashboard - Codeforces Round 1076 (Div. 3) - Codeforces")

[https://www.wolai.com/o1jB8e6zHTkLvyJuC8cxPR](https://www.wolai.com/o1jB8e6zHTkLvyJuC8cxPR "https://www.wolai.com/o1jB8e6zHTkLvyJuC8cxPR")

### B-贪心

#### 题目

长度为 $n$ 的排列是由 $n$ 个不同的整数组成的数组，这些整数从 $1$ 到 $n$ 按任意顺序排列。例如， $[2,3,1,5,4]$ 是一个排列，但 $[1,2,2]$ 和 $[1,3,4]$ 不是排列。

给你一个长度为 $n$的排列组合 $p$ 。你可以执行下面的操作1**次**：

- 选择两个整数 $l,$ $r$ ( $1\le l\le r\le n$ ).
- 将排列 $p$ 中的线段 $[l, r]$ 倒转。

您的任务是输出通过执行此操作可以得到的字典序最大的排列。

### 贪心

对于位置`i`的元素`p[i]`,若`p[i]==n-i`，则当前元素不需要进行交换；

找到第一个不满足上述条件的位置`i`，该位置应对应的值为`n - i`，在`p`中找到改值对应的位置`idx`，翻转`[i,idx]`即可得到字典序最大的排列。

```python title="贪心"
for _ in range(int(input())):
    n = int(input())
    p = list(map(int, input().split()))
    i = 0
    while i < n and p[i] == n - i:
        i+=1
    if i == n:
        print(*p)
    else:
        t = n - i
        idx = p.index(t)
        ans = p[:i] + p[i:idx+1][::-1] + p[idx+1:]
        print(*ans)
```


### C-贪心+前缀和

#### 题目

给定两个数组a和b，可以执行如下操作任意次：

1.对于位置$i(1≤i<n)$，替换$a_i$和$a_{i+1}$

2.对于位置$i(1≤i≤n)$，替换$a_i$和$b_i$

有$q$次查询，每个查询需要返回最大的$a[l,r]$的值

### 贪心+前缀和

对于操作1无法让后面的值赋值到前面的，故从后往前遍历，记录过程中两个数组中各自的最大值，此位置的最大值即为这两个值中的最大值；

对于每个查询，用前缀和加速计算

```python title="贪心+前缀和-py"
for _ in range(int(input())):
    n, q = map(int, input().split())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    val = [0]*n
    max_a = max_b = 0
    for i in range(n-1,-1,-1):
        max_a = max(max_a,a[i])
        max_b = max(max_b,b[i])
        val[i] = max(max_a,max_b)
    pre = [0]*(n+1)
    for i in range(1,n+1):
        pre[i] = pre[i-1] + val[i-1]
    ans = []
    for _ in range(q):
        l,r = map(int,input().split())
        ans.append(pre[r] - pre[l-1])
    print(*ans)
```


```c++ title="c++"
#include <bits/stdc++.h>
#define int long long
using namespace std;
signed main(){
    int t;
    cin >> t;
    while(t--){
        int n,q;
        cin >> n >> q;
        vector<int>a(n),b(n);
        for(int i = 0;i < n;i++) cin>>a[i];
        for(int i = 0;i < n;i++) cin>>b[i];
        vector<int> val(n);
        int max_a = 0,max_b = 0;
        for(int i = n - 1;i >= 0;i--){
            max_a = max(max_a,a[i]);
            max_b = max(max_b,b[i]);
            val[i] = max(max_a,max_b);
        }
        vector<long long> pre(n + 1,0);
        for(int i = 1;i <= n;i++){
            pre[i] = pre[i-1] + val[i-1];
        }
        while(q--){
            int l,r;
            cin >> l >> r;
            cout << pre[r] - pre[l-1] << " ";
        }
        cout << endl;
    }
    return 0;
}
```


### D-二分

#### 题目

1. **有 n 把剑**，每把剑有强度 `a[i]`
2. **有 n 个关卡**，每个关卡怪物需要 `b[i]` 次剑击才能打败
3. **剑的规则**：每把剑只能攻击一次就会折断
4. **难度选择**：选择 `x` 后，强度 `< x` 的剑不能使用

#### 二分

选择难度 `x` 后：

- 可用的剑：强度 ≥ x 的剑，数量为 `cnt`
- 这些剑总共只能攻击 `cnt` 次（每把剑一次）
- 要完成前 k 个关卡，需要 `sum(b[0:k])` 次攻击
- 所以须满足：`sum(b[0:k]) ≤ cnt`

**得分 = x × k**，其中 k 是能完成的最大关卡数。

通过前缀和+二分快速查找每个x对应的最大k

```python title="py"
import bisect
for _ in range(int(input())):
    n = int(input())
    a = list(map(int,input().split()))
    b = list(map(int,input().split()))
    ans = 0
    a.sort()
    pre = [0]*(n+1)
    for i in range(1,n+1):
        pre[i] = pre[i-1] + b[i-1]
    p = 0
    for i,x in enumerate(a):
        if x != p:
            p = x
            cnt = n - i
            k = bisect.bisect_right(pre,cnt) - 1
            if x * k > ans:
                ans = x * k
    print(ans)
```


```c++ title="c++"
#include <bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin >> t;
    while(t--){
        int n;
        cin >> n;
        vector<int> a(n);
        vector<int> b(n);
        for(int i = 0;i < n;i++) cin >> a[i];
        for(int i = 0;i < n;i++) cin >> b[i];
        vector<long long> pre(n+1,0);
        for(int i = 1;i <= n;i++){
            pre[i] = pre[i-1] + b[i-1];
        }
        sort(a.begin(),a.end());
        long long ans = 0;
        for(int i = 0;i < n;i++){
            if(i > 0 && a[i] == a[i-1]) continue;
            int x = a[i];
            int cnt = n - i;
            int k = upper_bound(pre.begin(),pre.end(),(long long)cnt) - pre.begin() - 1;
            long long s = (long long)x*k;
            if(s > ans) ans = s;
        }
        cout << ans << endl;
    }
    return 0;
}
```


### E-完全背包DP

#### 题目

- 给定一个长度为 n 的数组 a
- 对于每个 i (1 ≤ i ≤ n)，问能否从数组 a 中选择**若干个元素**（可以重复选择同一个元素），使得它们的**乘积恰好等于 i**
- 要求选择的**元素数量最少**，如果不可能则输出 -1
- 注意：必须至少选择一个元素

#### 完全DP

**初始化**：`dp[1..n] = INF`  表示得到乘积 i 所需的最少元素个数

**设置基础值**：对于数组 a 中的每个元素 x（x ≤ n），`dp[x] = 1`（选择这一个元素即可）

**DP 转移**：对于每个 i 从 1 到 n，遍历 j = i, 2i, 3i, ... ≤ n

- `dp[j] = min(dp[j], dp[i] + dp[j/i])`

```python title="DP"
for _ in range(int(input())):
    n = int(input())
    a = list(map(int,input().split()))
    INF = 10**9
    dp = [INF]*(n + 1)
    for x in a:
        if x <= n:
            dp[x] = 1
    for i in range(1,n+1):
        if dp[i] == INF:
            continue
        for j in range(i,n+1,i):
            if dp[j//i] != INF:
                dp[j] = min(dp[j],dp[i] + dp[j//i])
    ans = []
    for i in range(1,n+1):
        if dp[i] == INF:
            ans.append(-1)
        else:
            ans.append(dp[i])
    print(*ans)
```
