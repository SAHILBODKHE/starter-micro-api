class kmp_st_m{
void kmpsearch(String pat,String txt){
int M=pat.length();
int N=txt.length();
int lps[]=new int[M];
int j=0;
computePsa(lps,M,pat);
int i=0;
while(i<N){
if(pat.charAt(j)==txt.charAt(i)){
i++;
j++;
}
if(j==M){
System.out.println("Pattern found at "+[i-j]+"th index");
j=lps[j-1];
}
else if(i<N && pat.charAt(j)!=txt.charAt(i)){
if(j!=0){
j=lps[j-1];
}
else{
i=i+1;
}
}
}
}
void computePsa(int lps[],int M,String pat){
int len=0;
int i=1;
lps[0]=0;
while(i<M){
if(pat.charAt(i)==pat.charAt(len)){
len++;
lps[i]=len;
i++;

}
else{
if(len!=0){
len=lps[len-1];
}
else{
lps[i]=len;
i++;
}
}
}
}
public static void main(String args[]){
String txt="ABABDABACDABABCABAB";
String pat="ABABCABAB";
new kmp_st_m().kmpsearch(pat,txt);
}
}