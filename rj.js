kk = ['111111', 'kl']
let md = []
md = kk[0].split('')
kd = kk[0].split('')
console.log(md, kd)
oc = 'heart'
if (oc == 'heart') {
  md[0] = '0'
  kd[0] = '0'
}
if (oc == 'lungs') {
  md[1] = '0'
  kd[1] = '0'
}
if (oc == 'liver') {
  md[2] = '0'
  kd[2] = '0'
}
if (oc == 'kidney') {
  md[3] = '0'
  kd[3] = '0'
}
if (oc == 'pancreas') {
  md[4] = '0'
  kd[4] = '0'
}
if (oc == 'intestine') {
  md[5] = '0'
  kd[5] = '0'
}
console.log(md.join(''))
console.log(kd.join(''))
// console.log(md, kd)
