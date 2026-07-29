---
title: AWC64-01背包/最小生成树/树状数组+逆序对
published: 2026-05-07
description: AWC64题解-AK
image: ./cover.jpg
tags: [算法训练,AtCoder,AWC]
category: 算法训练
draft: False
---

# AWC64

#### 絮叨

疑似~~最简单~~,最板子(✔️)一次AWC？！

A题翻译看了半天不知道在说什么，谷歌翻译成一坨，乱七八糟的，盯了3分钟没看出来要干什么，直接开B了（~~模拟水题~~），B开完回头看了一眼A还是没看出来，就开了C，一眼01背包板子，愉快的AC。又来到A，翻译太乱实在看不懂，于是我自信的关闭翻译，用我这辈子过不了六级的水平读题，竟然看懂了？！！，hhhhh，骗你的，没看懂，看的案列猜出来让我干啥的了，缓慢AC（悲）。

来到D和E，都是板子，非常愉快，非常没有弯路，直接AC。

#### 难度

Easy: A,B,C

Mid: D,E

#### A-模拟

[A - Consecutive High-Score Segments](https://atcoder.jp/contests/awc0064/tasks/awc0064_a "A - Consecutive High-Score Segments")

**题目：**

要求的就是对于一个序列，求出连续的大于给定值K的子段个数

**题解：**

模拟即可

```python title="模拟"
n,k = map(int,input().split())
a = list(map(int,input().split()))
ans = 0
cnt = 0
for i,x in enumerate(a):
    if x >= k:
        cnt += 1
    else:
        if cnt >= 1:
            ans += 1
            cnt = 0
        else:
            continue
if cnt >= 1:
    ans += 1
print(ans)

```


#### B-模拟

[B - Card Taking Game](https://atcoder.jp/contests/awc0064/tasks/awc0064_b "B - Card Taking Game")

**题意：**

对于一个序列，两个人轮流拿牌，最大化每个人的得分

**题解：**

排序后贪心即可

```python title="模拟"
n = int(input())
a = list(map(int,input().split()))
a.sort()
cur1 = cur2 = 0
for i,x in enumerate(a):
    if i % 2 == 0:
        cur1 += x
    else:
        cur2 += x
print(abs(cur1 - cur2))
```


#### C-01背包

[C - Summer Homework Plan](https://atcoder.jp/contests/awc0064/tasks/awc0064_c "C - Summer Homework Plan")

**题意:**
01背包板子题

**题解：**

```python title="01背包-py"
n,m = map(int,input().split())
r = [0]*(n+1)
t = [0]*(n+1)
for i in range(1,n+1):
    x,y = map(int,input().split())
    r[i] = x
    t[i] = y
dp = [[0]*(m+1) for _ in range(n+1)]
for i in range(1,n+1):
    for j in range(1,m+1):
        if t[i] > j:
            dp[i][j] = dp[i-1][j]
        else:
            dp[i][j] = max(dp[i-1][j],dp[i-1][j-t[i]]+ r[i])
print(dp[n][m])
```


```c++ title="01背包-c++"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

int main(){
    int n, m;
    cin >> n >> m;
    vector<int> r(n+1), t(n+1);

    for(int i = 1; i <= n; i++){
        cin >> r[i] >> t[i];
    }

    vector<vector<ll>> dp(n+1, vector<ll>(m+1, 0));

    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= m; j++){
            if(t[i] > j){
                dp[i][j] = dp[i-1][j];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i-1][j - t[i]] + r[i]);
            }
        }
    }

    cout << dp[n][m] << endl;
    return 0;
}

```


#### D-最小生成树

[D - Bridges Connecting Remote Islands](https://atcoder.jp/contests/awc0064/tasks/awc0064_d "D - Bridges Connecting Remote Islands")

**题意：**

给定一个无向连通图 $G = (V, E)$，每条边有非负权值 $w(u,v)$。最小生成树是 $G$ 的一个子图，它是一棵树（$|V|-1$ 条边），包含所有顶点，且所有边的权值之和最小。

**题解：**

最小生成树Kruskal 算法板子题

```python title="Kruskal 算法-py"
n,m = map(int,input().split())
g = []
for _ in range(m):
    u,v,w = map(int,input().split())
    g.append((w,u,v))
g.sort()
p = list(range(n+1))
rank = [1]*(n+1)
def find(p, x):
    if p[x] != x:
        p[x] = find(p, p[x])
    return p[x]

def union(p, rank, x, y):
    rx, ry = find(p, x), find(p, y)
    if rx == ry:
        return False
    if rank[rx] < rank[ry]:
        p[rx] = ry
    elif rank[rx] > rank[ry]:
        p[ry] = rx
    else:
        p[ry] = rx
        rank[rx] += 1
    return True
res = 0
cnt = 0
for w,u,v in g:
    if union(p,rank,u,v):
        res += w
        cnt += 1
        if cnt == n-1:
            break
if cnt == n-1:
    print(res)
else:
    print("-1")
```


```c++ title="c++"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
vector<int> p;
vector<int> rk;
int find(int x){
    if(p[x] != x){
        p[x] = find(p[x]);
    }
    return p[x];
}
bool unite(int x,int y){
    int rx = find(x),ry = find(y);
    if(rx == ry){
        return false;
    }
    else if (rk[rx] < rk[ry]){
        p[rx] = ry;
    }
    else if (rk[rx] > rk[ry]){
        p[ry] = rx;
    }
    else{
        p[ry] = rx;
        rk[rx]++;
    }
    return true;
}
int main(){
    int n,m;
    cin >> n >> m;
    vector<tuple<int,int,int>>edges;
    for(int i = 0;i < m;i++){
        int u,v,w;
        cin >> u >> v >> w;
        edges.emplace_back(w,u,v);
    }
    sort(edges.begin(),edges.end());
    p.resize(n+1);
    rk.resize(n+1,1);
    for(int i = 1;i <= n;i++){
        p[i] = i;
    }
    long long res = 0;
    int cnt = 0;
    for (auto edge : edges) {
        int w = get<0>(edge), u = get<1>(edge), v = get<2>(edge);
        if (unite(u, v)) {
            res += w;
            cnt++;
            if (cnt == n - 1) break;
        }
    }
    if (cnt == n-1){
        cout << res << endl;
    }
    else{
        cout << -1 << endl;
    }
    return 0;
}

```


#### E-树状数组+逆序对

[E - Reduce Inversions with Adjacent Swaps](https://atcoder.jp/contests/awc0064/tasks/awc0064_e "E - Reduce Inversions with Adjacent Swaps")

**题意：**

1. 你有一个 1 到 N 的排列 `P`（长度为 N）。
2. 你可以进行最多 `K` 次操作。
3. 每次操作可以**交换相邻的两个数**。
4. 问：经过至多 `K` 次交换后，排列的**逆序对数**最小可以是多少？

**题解:**

依旧板子题

```python title="树状数组+逆序对-py"
class FT:
    def __init__(self, length):
        self.length = length
        self.tree = [0] * (length + 1)

    def lowbit(self, x):
        return x & -x

    def update(self, idx, val):
        while idx <= self.length:
            self.tree[idx] += val
            idx += self.lowbit(idx)

    def query(self, idx):
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= self.lowbit(idx)
        return res


def main():
    n, k = map(int, input().split())
    a = list(map(int, input().split()))
    sorted_a = sorted(set(a))
    mp = {v: i + 1 for i, v in enumerate(sorted_a)}
    m = len(mp)

    bit = FT(m)
    inv = 0
    for i, x in enumerate(a):
        idx = mp[x]
        inv += i - bit.query(idx)
        bit.update(idx, 1)
    ans = max(0, inv - k)
    print(ans)
if __name__ == "__main__":
    main()
```


```c++ title="c++"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

class FT{
private:
    int length;
    vector<ll> tree;
public:
    FT(int len):length(len),tree(len + 1,0){}
    int lowbit(int x){
        return x&-x;
    }
    void update(int idx,int val){
        while (idx <= length){
            tree[idx] += val;
            idx += lowbit(idx);
        }
    }
    ll query(int idx){
        ll res = 0;
        while (idx > 0){
            res += tree[idx];
            idx -= lowbit(idx);
        }
        return res;
    }
};

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n,k;
    cin >> n >> k;
    vector<int> a(n);
    
    for(int i = 0;i < n;i++){
        cin >> a[i];
    }
    
    vector<int> sorted_a(a.begin(),a.end());
    sort(sorted_a.begin(),sorted_a.end());
    sorted_a.erase(unique(sorted_a.begin(), sorted_a.end()), sorted_a.end());
    
    unordered_map<int,int>mp;
    for(size_t i = 0;i < sorted_a.size();i++){
        mp[sorted_a[i]] = i + 1;
    }
    
    int m = sorted_a.size();
    FT bit(m);
    ll inv = 0;
    
    for(int i = 0;i < n;i++){
        int idx = mp[a[i]];
        inv += i - bit.query(idx);
        bit.update(idx,1);
    }
    
    ll ans = max(0LL, inv - k);
    cout << ans << endl;
    return 0;
}
```
