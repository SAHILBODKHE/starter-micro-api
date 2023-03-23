const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const pool = require('./db')
const { dirname } = require('path')
const app = express()
const path = require('path')
const req = require('express/lib/request')
const { timeStamp } = require('console')
const { add } = require('nodemon/lib/rules')
const { json } = require('body-parser')
const { lookupService } = require('dns')
const { keepalives_idle } = require('pg/lib/defaults')
module.exports = function () {
  var ntwl = pool.query(
    ' SELECT * FROM donorcard,recipient WHERE donorcard.donor_id=recipient.recipient_id;',
  )
  let as = []
  let dno = []
  let hoid = []
  let sn = []
  let aadharc = []
  let em = []
  let add = []
  let pn = []
  let cn = []
  let stn = []
  let zp = []
  let ht = []
  let wt = []
  let gen = []
  let fan = []
  let mon = []
  let orgdt = []
  let btype = []
  let ttype = []
  let bs = []
  let mps = []
  let lt = []
  let nlha = []
  let cbd = []
  let orq = []
  let esc = []
  let rgd = []
  let rr = []

  console.log(ntwl.rows)
  //  [{firstname:}]=ntwl.rows
  const ks = Object.entries(ntwl.rows)
  console.log(ks[1])
  for (it of ks) {
    const {
      firstname: fn,
      lastname: ln,
      donor_id: dn,
      hospid: hi,
      aadhar_card: aci,
      email: emi,
      address_id: addi,
      phone_no: pni,
      country: cni,
      state_name: stni,
      zip: zpi,
      height: hti,
      weight_kg: wti,
      gender: geni,
      father_name: fani,
      mother_name: moni,
      ts: orgdti,
      bloodtype: btypei,
      tissuetype: ttypei,
      bodysize: bsi,
      meld_peld_score: mpsi,
      lymphocytotoxic: lti,
      no_hla_antigens: nlhai,
      cmv_ebv_details: cbdi,
      organ_reqcode: orqi,
      emergency_statuscode: esci,
      regdate: rgdi,
      recipient_report: rri,
    } = it[1]
    as.push(fn)
    dno.push(dn)
    hoid.push(hi)
    sn.push(ln)
    aadharc.push(aci)
    em.push(emi)
    add.push(addi)
    pn.push(pni)
    cn.push(cni)
    stn.push(stni)
    zp.push(zpi)
    ht.push(hti)
    wt.push(wti)
    gen.push(geni)
    fan.push(fani)
    mon.push(moni)
    orgdt.push(orgdti)
    btype.push(btypei)
    ttype.push(ttypei)
    bs.push(bsi)
    mps.push(mpsi)
    lt.push(lti)
    nlha.push(nlhai)
    cbd.push(cbdi)
    orq.push(orqi)
    esc.push(esci)
    rgd.push(rgdi)
    rr.push(rri)
  }
}
//   module.exports=Details;
