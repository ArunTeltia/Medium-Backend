#include <bits/stdc++.h>
using namespace std;
#define allsort(a) sort(a.begin(), a.end());
#define allsorta(a) sort(a, a + n);
#define all(a) a.begin(), a.end()
#define ll long long
#define endl "\n"
#define MOD 1000000007
#define pb push_back
const int N = 0;
void solve()
{
    string name, street_2;
    ll start, end, samay, len;
    ll time, intersections, streets, car, score;
    cin >> time >> intersections >> streets >> car >> score;
    map<string, pair<int, int>> intersections_involved;
    map<int, set<string>> left, right;
    map<string, int> time_to_cross;
    for (int i = 0; i < streets; i++)
    {
        cin >> start >> end >> name >> samay;
        right[end].insert(name);
        intersections_involved[name] = {start, end};
        time_to_cross[name] = samay;
    }
    set<int> s;
    map<int, vector<string>> mp;
    for (int i = 0; i < car; i++)
    {
        cin >> len;
        for (int j = 0; j < len; j++)
        {
            cin >> street_2;
            mp[len].pb(street_2);
            pair<int, int> x = intersections_involved[street_2];
            if (j == 0)
            {
                s.insert(x.second);
            }
            else if (j == len - 1)
            {
                s.insert(x.first);
            }
            else
            {
                s.insert(x.second);
                s.insert(x.first);
            }
        }
    }
    cout << s.size() << endl;
    set<string> k;
    for (auto i : s)
    {
        cout << i << endl;
        cout << right[i].size() << endl;
        for (auto j : right[i])
        {
            cout << j << " " << time_to_cross[j] << endl;
        }
    }
}
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif
    long long int t = 1;
    //cin >> t;
    for (int tt = 0; tt < t; tt++)
    {
        solve();
    }
    return 0;
}