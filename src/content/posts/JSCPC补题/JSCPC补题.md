---
title: JSCPC补题
published: 2026-05-18
description: 全是思维题补题太困难了
image: ./cover.jpg
tags: [contest]
category: contest
draft: False
---

# JSCPC补题

赛时只切了签到，~~太丢脸~~，I本可以但是被误导了（~~太可惜~~），A被卡PY了，1：1转换的C++可过，~~太可惜~~，萌新第一次参加省赛，本就带着被搏杀的心态，不过也是感受到了XCPC比赛现场的氛围，不后悔(补题以H这道反悔贪心做结束)。

下面是补题（×），补个der，拼尽全力也想不出除ACI外的其他题，太多思维题了，被吓哭了，于是召唤gemini3PRO，协助补题

Easy：I、C

Easy-Mid：A、B、F、L

Mid：H、J、K

其余三题不属于我能看的，，，，

**除ICA外其余题的题解均来自gemini3PRO，提供的代码均AC**

[26年JSCPC.pdf](https://qoj.ac/contest/3756 " 26年JSCPC.pdf")

</details>
<details> <summary>I-模拟题</summary>

非常遗憾的一道签到题，赛时队友说是经典题，要动用神秘小算法，实际上，只要简简单单的模拟即可，太可惜！

```python title="模拟"
word = []
import string
words = list(string.ascii_lowercase)
for a in words:
    for b in words:
        word.append(a+b)
sorted(word)
for _ in range(int(input())):
    ok = False
    ans = ''
    s1 = input().strip()
    s2 = input().strip()
    for c in word:
        c1 = c[0]
        c2 = c[1]
        if (c1 in s1 and c2 in s1 and s1.find(c1) < s1.find(c2,s1.find(c1)+1)) and (c1 in s2 and c2 in s2 and s2.find(c1) < s2.find(c2,s2.find(c1)+1)):
            ok = True
            ans = c
            break
    if ok:
        print(ans)
    else:
        print('HENG!')


```

</details>
<details> <summary>C-位运算思维题</summary>

熟悉按位与、异或、或的运算先后顺序以及字符串为01串的性质

只要字符串有'0'存在，在每个字符都进行按位与运算即可

对于全是1的情况，由于按位与的运算优先级最高，故只需要在第一个和第二个字符之间插入按位异或，其余位置插入按位与即可

```python title="位运算+思维"
n = int(input().strip())
s = input().strip()
ans = ''
if '0' in s:
    ans = '&'*(n-1)
else:
    ans = '^'+'&'*(n-2)
print(ans)
```


</details>
<details> <summary>A-二分答案+区间覆盖</summary>

非常可惜的一道题，赛时思路和正解一模一样，可惜被卡了PY，哭死

**区间覆盖转化**：

假设当前二分枚举到的时间是 $T$。对于第 $i$ 个舞者：

- 如果他还没有出生（即 $T < a_i$），那么他对当前时间没有贡献。
- 如果他已经出生（即 $T \ge a_i$），他已经存活了 $T - a_i$ 秒。由于他每秒向左右各扩展 1 个单位，所以该舞者及其召唤出的分身能覆盖的连续坐标区间为：

$[b_i - (T - a_i), \ b_i + (T - a_i)]$

将所有满足条件的舞者的覆盖区间收集起来，问题就转换为了：**判断这些线段能否完全覆盖住区间 **$[0, k]$** 的所有整数点。**

**合并区间判定**：

- 将收集到的所有区间按照左端点从小到大排序。
- 设定当前已经连续覆盖到的最右侧端点 `cur_R = -1`。
- 遍历排序后的区间：
- 如果下一个区间的左端点 $L \le \text{cur\_R} + 1$（注意：因为坐标是整数，所以两个区间哪怕没有交点，只要相差 1 也能算作整数连续覆盖，例如 $[0, 2]$ 和 $[3, 5]$ 合起来能覆盖 $0 \sim 5$）。
- 更新 `cur_R `。
- 如果 $L > \text{cur\_R} + 1$，说明出现了无法弥补的空隙，直接跳出判断。
- 最后只需检查 `cur_R` 是否大于等于 $k$ 即可。

```python title="py-TLE"
import sys
def solve():
    input = lambda:sys.stdin.readline().strip()
    n,k = map(int,input().strip().split())
    zombies = []
    for _ in range(n):
        a,b = map(int,input().split())
        zombies.append((a, b))
    def check(T):
        t = []
        for a, b in zombies:
            if T >= a:
                spread = T - a
                t.append((b - spread, b + spread))
        if not t:
            return False
        t.sort()
        cur_R = -1
        for L, R in t:
            if L <= cur_R + 1:
                if R > cur_R:
                    cur_R = R
            else:
                break
        return cur_R >= k
    l,r = -1,10**9
    while l + 1 < r:
        mid = (l + r)//2
        if check(mid):
            r = mid
        else:
            l = mid
    print(r)
if __name__ == '__main__':
    solve()
```


```c++ title="C++"
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
void solve() {
    long long n, k;
    if (!(cin >> n >> k)) return;
    vector<pair<long long, long long>> zombies(n);
    for (int i = 0; i < n; ++i) {
        cin >> zombies[i].first >> zombies[i].second;
    }
    auto check = [&](long long T) {
        vector<pair<long long, long long>> t;
        for (const auto& zombie : zombies) {
            long long a = zombie.first;
            long long b = zombie.second;
            if (T >= a) {
                long long spread = T - a;
                t.push_back({b - spread, b + spread});
            }
        }
        if (t.empty()) {
            return false;
        }
        sort(t.begin(), t.end());
        long long cur_R = -1;
        for (const auto& interval : t) {
            long long L = interval.first;
            long long R = interval.second;

            if (L <= cur_R + 1) {
                if (R > cur_R) {
                    cur_R = R;
                }
            } else {
                break;
            }
        }
        return cur_R >= k;
    };
    long long l = -1;
    long long r = 1000000000000000000LL;

    while (l + 1 < r) {
        long long mid = (l + r) / 2;
        if (check(mid)) {
            r = mid;
        } else {
            l = mid;
        }
    }

    cout << r << "\n";
}
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}
```


</details>
<details> <summary>F-数学思维题</summary>

**取值范围的连续性**：

假设能通过某组 $a$ 和 $m$ 得到 $\text{mex}(a) = k$，那么一定也能得到 $\text{mex}(a) = k-1$。只需要找到原数组 $a$ 中等于 $k-1$ 的那个数，给它加上一个足够大的 $m$ 的倍数（例如 $C \cdot m$），让它变成一个极大的数即可。这样 $k-1$ 就从数组中消失了，而比 $k-1$ 小的数不受影响，新的 $\text{mex}$ 就变成了 $k-1$。

**结论**：可能得到的 $\text{mex}$ 值一定是从 $0$ 开始的\*\*连续整数区间 \*\*$[0, K_{\max}]$，因此答案就是 $K_{\max} + 1$。

**模数 **$m$** 的下界限制**：

由于 $b_i = a_i \bmod m$，根据取模的定义，余数一定小于模数，所以必须满足 $m > \max(b)$。

令 $M = \max(b)$，则\*\*模数 **$m$** 最少为 \*\*$M + 1$。

\*\*如何得到最大的 \*\*$K_{\max}$

如果要凑出 $\text{mex} = k$，意味着 $0, 1, 2, \dots, k-1$ 都要在数组 $a$ 中出现。

因为 $m > M$，对于任何 $x \in \{0, 1, \dots, k-1\}$，如果要让 $a_i = x$，由于 $a_i \equiv b_i \pmod m$，必定要求 $b_i = x \bmod m$。

这里分为两种情况：

- **情况一：**$\text{mex}(b) \le M$

这意味着在 $0$ 到 $M$ 之间，有一个最小的数（即 $\text{mex}(b)$）在 $b$ 中完全没有出现过。因为无论选多大的 $m > M$，都无法凭空变出这个余数，所以永远也凑不出这个缺失的数。

在这种情况下，最大的 $K_{\max} = \text{mex}(b)$。

- **情况二：**$\text{mex}(b) = M + 1$

这意味着 $0, 1, \dots, M$ 每一个数都在 $b$ 中出现了至少一次。

此时为了让 $k$ 尽可能大，只需取 $m$ 的下界，即 $m = M + 1$。

对于 $b$ 中的某个值 $x$（$0 \le x \le M$），它在 $b$ 中出现了 $cnt[x]$ 次。它能贡献出的 $a_i$ 的值依次为：$x,\ x + m,\ x + 2m, \dots$。

这 $cnt[x]$ 个坑位，最多只能撑到 $x + (cnt[x] - 1) \cdot m$。一旦试图突破，就会因为 $x$ 对应的余数不够用而断档。断档的那个值就是 $x + cnt[x] \cdot m$。

因为 $\text{mex}$ 取决于“木桶效应”里最短的那块板，所以最大能达到的 $K_{\max}$ 就是所有余数断档值的最小值：

$$
K_{\max} = \min_{0 \le x \le M} \big(x + cnt[x] \cdot (M + 1)\big)
$$

```python title="思维题"
n = int(input().strip())
a = list(map(int,input().strip().split()))
m = max(a)
p = [False]*(n+2)
for x in a:
    if x <= n + 1:
        p[x] = True
mex = 0
while p[mex]:
    mex += 1
if mex <= m:
    print(mex + 1)
else:
    cnt = [0]*(m+1)
    for x in a:
        if x <= m:
            cnt[x] += 1
    max_k = min(x + cnt[x]*(m+1) for x in range(m + 1))
    print(max_k + 1)
```


</details>
<details> <summary>B-数学思维题</summary>

**向平方根靠拢**

题目要求寻找非负整数 $a, b, c$ 满足 $a \times b + c = x$，且极差 $\max(a, b, c) - \min(a, b, c)$ 尽可能小。

为了让三者的差距最小，理想情况下它们应该尽可能接近。由于 $a \times b \approx x$，那么 $a$ 和 $b$ 必然都在 $\sqrt{x}$ 的附近。

**枚举策略**

设定 $a \le b$。为了以最快速度找到最优解，我们\*\*从 **$a = \lfloor\sqrt{x}\rfloor$** 开始，逆向向下枚举 \*\*$a$。

对于每一个固定的 $a$，为了让 $b$ 靠近 $a$ 且 $c$ 最小，基础的 $b$ 应该是商：$b_{\text{base}} = \lfloor x / a \rfloor$。

此时基础的 $c$ 就是余数：$c_{\text{base}} = x \bmod a$。

**内层枚举**

有时候基础的 $c_{\text{base}}$ 可能会比 $a$ 和 $b$ 小很多。此时可以“牺牲”一点 $b$，来“喂饱” $c$。

具体来说，如果将 $b$ 减小 $1$，那么为了保持总和等于 $x$，$c$ 就必须增加 $a$。

因为 $a$ 在 $\sqrt{x}$ 附近，这种补偿非常剧烈，我们只需要让 $b$ 向下减小 $0$ 到 $4$ 次，就绝对能覆盖所有可能让极差缩小的组合了。超出这个微调范围，$c$ 就会变得太大，极差反而会飙升。

**剪枝**

这是最关键的一步，也是解决 TLE 的根本！

随着枚举的推进，$a$ 越来越小，导致 $b_{\text{base}} = \lfloor x / a \rfloor$ 越来越大。

这意味着 $b_{\text{base}}$ 和 $a$ 的差距是**严格单调递增**的。

如果发现当前的 $b_{\text{base}} - a$ 已经大于或等于我们手中目前的最优极差（加上内层循环微调的容错值 5），那就说明：**再往下枚举，即便怎么微调，a 和 b 的撕裂程度都已经超过了历史最优解，不可能再产生更小的极差了！**

此时直接 `break` 结束当前用例的寻找。

```c++ title="卡py"
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;
void solve() {
    long long x;
    cin >> x;
    if (x == 0) {
        cout << 0 << "\n";
        return;
    }
    long long k = sqrt(x);
    long long ans = x;

    for (long long a = k; a >= 1; --a) {
        long long b_base = x / a;
        if (b_base - a >= ans + 5) {
            break;
        }

        long long rem = x % a;
        for (long long nx = 0; nx < 5; ++nx) {
            long long b = b_base - nx;
            if (b < 0) {
                break;
            }
            long long c = rem + nx * a;

            long long mn = min({a, b, c});
            long long mx = max({a, b, c});
            long long sp = mx - mn;

            if (sp < ans) {
                ans = sp;
            }
        }
    }
    cout << ans << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    if (cin >> t) {
        while (t--) {
            solve();
        }
    }
    return 0;
}
```


</details>
<details> <summary>L-博弈思维题</summary>

**状态转换：从原数组到差分数组**

将数组 $a$ **降序排序**，并在末尾补上一个 $0$（即 $a_{n+1} = 0$）。

观察相邻元素的差值，构造差分数组 $D$：

$$
D_k = a_k - a_{k+1} \quad (1 \le k \le n)
$$

比如数组 $a = [4, 2, 1, 1]$，补 $0$ 后为 $[4, 2, 1, 1, 0]$。

对应的差分数组 $D = [2, 1, 0, 1]$。

**操作的本质**

如果在降序数组中，玩家选择了一个值 $a_k$（必须满足 $a_k > a_{k+1}$，也就是差分 $D_k > 0$），根据游戏规则：

- 所有 $> a_k$ 的元素全部变成 $a_k$。
- 选中的 $a_k$ 变成 $a_k - 1$。
- 其余 $\le a_k$ 的元素保持不变。

对应到差分数组 $D$ 上，这个操作等价于：

- $D_k \leftarrow D_k - 1$
- $D_{k-1} \leftarrow 1$ （如果 $k > 1$）
- $D_1 \sim D_{k-2}$ 全部被**清零** （即 $D_i \leftarrow 0$）
- $D_{k+1}$ 及以后的元素**完全不变**。

**必胜态（W）与必败态（L）的判定**

注意差分数组的一个致命特性：**对 **$D_k$** 的操作，会瞬间将 **$k-1$** 之前的所有历史状态全部抹除（归零）**！

通过严格的博弈论推导，我们发现只有**奇数索引位置**（$D_1, D_3, D_5 \dots$）的奇偶性才决定游戏胜负：

- **必胜态（Insight 赢）**：存在**至少一个**奇数索引 $i$（如 1, 3, 5...），使得 $D_i$ 为**奇数**。
- **必败态（Maya 赢）**：所有奇数索引 $i$ 上的 $D_i$ 全都是**偶数**。

**为什么这个结论是对的？**

- **如果当前是必败态（全是偶数）**：不管玩家选哪个合法的 $k$（$D_k > 0$），
- 如果选奇数 $k$，$D_k$ 减 $1$ 变成奇数，把一个奇数留给了对手。
- 如果选偶数 $k$，规则会强制令 $D_{k-1} = 1$。因为 $k$ 是偶数，$k-1$ 就是奇数，同样把一个奇数留给了对手。
- 无论怎么走，都会把**必胜态**拱手让给对方。
- **如果当前是必胜态（有奇数）**：玩家只需找到\*\*最靠右的、值为奇数的奇数索引 \*\*$k$，然后选择它。
- $D_k$ 减 $1$ 变成了偶数。
- $D_{k-1}$ 虽然变成 $1$，但 $k-1$ 是偶数索引，不影响胜负判定。
- 最恐怖的是，所有 $< k-1$ 的差分值全部被清零（变成了偶数）。
- 这完美地将场上所有奇数索引的值变成了偶数，直接把**必败态**踢给对手！

**结论**：降序排序后，将相邻两项两两分组。如果存在一组的差值为奇数，则先手（Insight）必胜；否则后手（Maya）必胜。

```python title="博弈题"
def main():
    for _ in range(int(input().strip())):
        n = int(input().strip())
        a = list(map(int,input().strip().split()))
        a.sort(reverse=True)
        a.append(0)
        ok = False
        for i in range(0, n, 2):
            diff = a[i] - a[i + 1]
            if diff % 2 != 0:
                ok = True
                break
        if ok:
            print("Insight")
        else:
            print("Maya")
if __name__ == '__main__':
    main()
```


</details>
<details> <summary>K-离线处理+线段树+贪心</summary>

**固定的买入行为**

买入阈值 $a$ 是固定的。无论询问的卖出阈值 $b$ 是多少，**触发买入的时间点和总买入次数永远不变**（即满足 $v_i \le a$ 的点）。

因此，我们能够在一开始就算出：**总买入股票数量** `Total_B` 和 **总买入成本** `Total_Cost`。

**左到右贪心匹配机制**

对于任何给定的 $b$，合法的卖出点就是那些 $v_i \ge b$ 的点。

机器人的交易逻辑是“遇到能卖的，只要手里有股票就立刻卖”。这可以完全等效为一个**括号匹配模型**：

- 买入操作（$v_i \le a$）视作左括号 `(`
- 卖出操作（$v_i \ge b$）视作右括号 `)`
- 机器人从左到右匹配，只要有未匹配的 `(`，遇到 `)` 就立刻匹配。
- 任何到最后都没有被匹配的 `(`（即最后手中剩下的股票），都会在最后以平仓价 $v_n$ 卖出。

**收益公式的统一化**

根据以上结论，总收益的计算公式可以简化为：

$$
\text{总收益} = \text{成功匹配的卖出总金额} + (\text{总买入数量} - \text{成功匹配的数量}) \times v_n - \text{总买入成本}
$$

在这其中，买入数量、平仓价 $v_n$、买入成本都是常数，我们**唯一需要动态维护的，就是“成功匹配的卖出点所带来的金额总和”以及“成功匹配的数量”**。

如果针对每个询问单独从头模拟，复杂度将是 $O(N \times M)$，必将超时。

由于多个询问之间只有参数 $b$ 不同，我们采用**离线处理策略**：

- 将所有查询按照 $b$ **从大到小降序排序**。
- 随着 $b$ 的减小，会有越来越多的历史价格 $v_i$ 跨过 $b$ 的门槛，成为“有效卖出点”。
- 我们每次只需单点激活这些新的有效卖出点即可。

**线段树的设计**（核心难点）：

为了在 $O(\log N)$ 时间内更新一次，我们需要一颗区间线段树。线段树的每一个节点管理一个时间区间 $[L, R]$，并维护该区间内部：

1. `cnt_B`：内部未被匹配的**买入**次数（左括号）
2. `cnt_S`：内部未被匹配的**激活卖出**次数（右括号）
3. `sum_S`：内部未被匹配的激活卖出的**金额之和**
4. `matched_sum`：**内部已经成功匹配**的卖出金额之和

**合并两个子区间（Left 和 Right）时的物理意义：**

- 左区间的剩余 `(` 会遇到右区间的剩余 `)` 并发生匹配。
- 匹配数量 $M = \min(\text{Left.cnt\_B}, \text{Right.cnt\_S})$。
- 贪心策略下，左边过来的股票，一定会匹配到右区间**最靠前的** $M$ 个可用卖出点！
- 为了实现这一点，我们需要在右区间内进行递归搜索函数 `get_sum_slice`，询问：“右区间内前 $M$ 个未匹配的卖出点，金额之和是多少？”
- 借助这个函数，父节点可以精准快速地（$O(\log N)$）合并左右区间。

```c++ title="数据结构题"
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    int cnt_B;
    int cnt_S;
    long long sum_S;
    long long matched_sum;
};

const int MAXN = 200005;
Node tree[4 * MAXN];
long long v[MAXN];
long long a;

// 核心函数：查询节点 node 内部，前 k 个未被匹配的卖出点的金额总和
long long get_sum_slice(int node, int L, int R, int st, int k) {
    if (k == 0) return 0;
    // 如果需要的数量正好等于该节点总的未匹配卖出数，直接 $O(1)$ 返回，极大加速
    if (k == tree[node].cnt_S) return tree[node].sum_S;

    int mid = L + (R - L) / 2;
    int left_child = 2 * node;
    int right_child = 2 * node + 1;

    int C_L = tree[left_child].cnt_S;
    if (st + k <= C_L) {
        return get_sum_slice(left_child, L, mid, st, k);
    }

    int M = min(tree[left_child].cnt_B, tree[right_child].cnt_S);
    if (st >= C_L) {
        int st_R = M + (st - C_L);
        return get_sum_slice(right_child, mid + 1, R, st_R, k);
    }

    // 如果横跨左右子树的未匹配队列
    int k1 = C_L - st;
    int k2 = k - k1;
    return get_sum_slice(left_child, L, mid, st, k1) +
           get_sum_slice(right_child, mid + 1, R, M, k2);
}

void pull(int node, int L, int R) {
    int left_child = 2 * node;
    int right_child = 2 * node + 1;
    int mid = L + (R - L) / 2;

    int M = min(tree[left_child].cnt_B, tree[right_child].cnt_S);

    tree[node].cnt_B = tree[left_child].cnt_B - M + tree[right_child].cnt_B;
    tree[node].cnt_S = tree[left_child].cnt_S + tree[right_child].cnt_S - M;

    // 获取右子区间被匹配掉的前 M 个卖出点金额
    long long matched_R = get_sum_slice(right_child, mid + 1, R, 0, M);

    tree[node].sum_S = tree[left_child].sum_S + tree[right_child].sum_S - matched_R;
    tree[node].matched_sum = tree[left_child].matched_sum + tree[right_child].matched_sum + matched_R;
}

void build(int node, int L, int R) {
    if (L == R) {
        if (v[L] <= a) {
            tree[node].cnt_B = 1;
            tree[node].cnt_S = 0;
            tree[node].sum_S = 0;
            tree[node].matched_sum = 0;
        } else {
            tree[node].cnt_B = 0;
            tree[node].cnt_S = 0;
            tree[node].sum_S = 0;
            tree[node].matched_sum = 0;
        }
        return;
    }
    int mid = L + (R - L) / 2;
    build(2 * node, L, mid);
    build(2 * node + 1, mid + 1, R);
    pull(node, L, R);
}

void update(int node, int L, int R, int idx) {
    if (L == R) {
        tree[node].cnt_S = 1;
        tree[node].sum_S = v[idx];
        return;
    }
    int mid = L + (R - L) / 2;
    if (idx <= mid) update(2 * node, L, mid, idx);
    else update(2 * node + 1, mid + 1, R, idx);
    pull(node, L, R);
}

void solve() {
    int n;
    cin >> n >> a;

    long long Total_B = 0;
    long long Total_Cost = 0;
    vector<pair<long long, int>> sells;

    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        if (v[i] <= a) {
            Total_B++;
            Total_Cost += v[i];
        } else {
            sells.push_back({v[i], i});
        }
    }

    build(1, 1, n);

    int m;
    cin >> m;
    vector<pair<long long, int>> queries(m);
    for (int i = 0; i < m; i++) {
        cin >> queries[i].first;
        queries[i].second = i;
    }

    // 降序排序
    sort(sells.rbegin(), sells.rend());
    sort(queries.rbegin(), queries.rend());

    vector<long long> ans(m);
    int p = 0;

    for (int i = 0; i < m; i++) {
        long long b = queries[i].first;
        int q_idx = queries[i].second;

        // 激活大于等于当前 b 阈值的卖出点
        while (p < sells.size() && sells[p].first >= b) {
            update(1, 1, n, sells[p].second);
            p++;
        }

        long long matched_count = Total_B - tree[1].cnt_B;
        long long profit = tree[1].matched_sum + (Total_B - matched_count) * v[n] - Total_Cost;
        ans[q_idx] = profit;
    }

    for (int i = 0; i < m; i++) {
        cout << ans[i] << (i == m - 1 ? "" : " ");
    }
    cout << "\n";
}

int main() {
    // 接触 I/O 封印，极大提升运行速度
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int T;
    if (cin >> T) {
        while (T--) solve();
    }
    return 0;
}
```

</details>
<details> <summary>H-反悔贪心</summary>

**统一价值度量**：

一枚金币等于 $k$ 块钱，也可以造成 $k$ 点伤害。一枚银币等于 $1$ 块钱，造成 $1$ 点伤害。

因此，不论是金币还是银币，$1$\*\* 点伤害的成本永远是 **$1$**块钱 \*\*。我们要让最终剩余的钱最多，就等价于让打怪时**浪费的伤害总和最小**。

只有在使用金币对抗不足 $k$ 点血量的目标时，才会产生“伤害溢出”的浪费。

**贪心策略与反悔机制**：

面对血量为 $x$ 的怪物，令 $q = \lfloor x / k \rfloor$，$r = x \bmod k$。

- **对于 **$q \times k$** 的部分**：用 $q$ 枚金币是完美无缺的（浪费为 $0$）。如果没有足够的金币，只能强制用银币凑，这也是无法避免的。
- **对于余数 **$r$** 的部分**：

我们**总是优先假设使用 **$r$** 枚银币**（因为这也不会造成任何浪费）。

但是，万一我们后来遇到银币不足的情况怎么办？

这时候，我们可以进行**反悔（Regret）**：我们可以假装“之前某个怪物我不花 $r$ 枚银币了，我改用 $1$ 枚金币砸死它”，这样我们虽然浪费了 $k-r$ 的伤害，但是成功**拿回了 **$r$** 枚银币**用于救急！

**数据结构维护**：

我们需要维护当前拥有的金币 $G$、银币 $S$，以及一个记录所有**可反悔操作**的数据结构 `H`（存放着所有我们决定用银币垫付的 $r$）。

- `H` 的容量不能超过当前 $G$ 的数量。因为如果要反悔，你必须得交得出 $1$ 枚金币。
- 如果 $G$ 不够用了（比如要支付 $q$ 的时候金币不够），我们就从 `H` 中删去**最小**的 $r$（取消反悔权），以腾出金币去支付 $q$。
- 如果 $S < 0$ 欠债了，我们就从 `H` 中弹出**最大**的 $r$ 执行反悔（消耗 $1$ 枚金币，换取最多的银币补齐欠款）。

在 C++ 中，`std::multiset` 天然支持完美获取/删除最值，代码可以写得极为优雅紧凑。注意开 `long long` 防止 `G` 累加越界。

```c++ title="反悔贪心"
#include <iostream>
#include <vector>
#include <set>
#include <algorithm>

using namespace std;

void solve() {
    long long n, k;
    cin >> n >> k;
    
    long long G = 0, S = 0;
    multiset<long long> H;
    bool possible = true;
    
    for (int i = 0; i < n; ++i) {
        long long o, x;
        cin >> o >> x;
        
        if (!possible) continue; // 如果已经无法存活，只需读取剩下的输入，不再进行逻辑处理
        
        if (o == 1) {
            G += x;
        } else if (o == 2) {
            S += x;
        } else if (o == 3) {
            long long q = x / k;
            long long r = x % k;
            
            // 处理大块 q：必须用到实打实的金币
            long long free_G = G - H.size();
            long long use_free = min(q, free_G);
            G -= use_free;
            q -= use_free;
            
            // 如果自由金币不够，只能从历史记录中强行取消一些反悔权（取消最小的，损失最少）
            while (q > 0 && !H.empty()) {
                H.erase(H.begin());
                G -= 1;
                q -= 1;
            }
            
            if (q > 0) {
                S -= q * k;
            }
            
            // 处理余数 r：优先用银币支付
            S -= r;
            if (r > 0) {
                if (G > (long long)H.size()) {
                    H.insert(r);
                } else if (!H.empty() && r > *H.begin()) {
                    H.erase(H.begin());
                    H.insert(r);
                }
            }
            
            // 债务结算：如果银币超支了，行使反悔权（消耗1金币换回当初交出去的银币）
            while (S < 0 && !H.empty()) {
                auto it = prev(H.end());
                long long r_max = *it;
                H.erase(it);
                G -= 1;
                S += r_max;
            }
            
            if (S < 0) {
                possible = false;
            }
        }
    }
    
    if (possible) {
        cout << G * k + S << "\n";
    } else {
        cout << "-1\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    if (cin >> t) {
        while (t--) solve();
    }
    
    return 0;
}

```
