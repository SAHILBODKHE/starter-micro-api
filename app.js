//jshint esversion:6

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
const { reset } = require('nodemon')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// var details = require('./file')
app.listen(5001, function () {
  console.log('Server is running on the port 3000')
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/contact.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'))
})
app.post('/contact.html', async (req, res) => {
  try {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    const newname = await pool.query(
      'INSERT INTO contact (client,email,message) VALUES ($1,$2,$3) ',
      [name, email, message],
    )
    console.log(newname)
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/donorcard.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'donorcard.html'))
})
app.post('/donorcard.html', async (req, res) => {
  try {
    var fname = req.body.firstname
    var lname = req.body.lastName
    var aadhar = req.body.aadhar_id
    var email = req.body.email_id
    var address = req.body.address
    var phone = req.body.mobile_no
    var country = req.body.nation
    var state = req.body.state
    var pin = req.body.code
    var height = req.body.height
    var weight = req.body.weight
    var gender = req.body.gender
    var fathername = req.body.fathername
    var mname = req.body.mothername
    var today = new Date()

    var date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

    var dateTime = date + ' ' + time
    const details = await pool.query(
      'INSERT INTO donorcard (firstname,lastname, AADHAR_card,email, address_id,Phone_no, Country,State_name,zip, height,weight_kg, gender,father_name,mother_name,ts) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
      [
        fname,
        lname,
        aadhar,
        email,
        address,
        phone,
        country,
        state,
        pin,
        height,
        weight,
        gender,
        fathername,
        mname,
        dateTime,
      ],
    )
    res.render('list', {
      firstn: fname,
      lastn: lname,
      ad: aadhar,
      em: email,
      add: address,
      ph: phone,
      cn: country,
      st: state,
      pn: pin,
      ht: height,
      wt: weight,
      gd: gender,
      fn: fathername,
      mn: mname,
      dt: dateTime,
    })
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/hospreg.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'hospreg.html'))
})
app.post('/action_page.php', async (req, res) => {
  try {
    var hospitalid = req.body.hospid
    var pass = req.body.psw
    const hosp_details = await pool.query(
      'INSERT INTO hospital(hospital_id,password) VALUES ($1,$2)',
      [hospitalid, pass],
    )
    console.log(hospitalid)
    res.redirect('/hospinfo.html')
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/hospinfo.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'hospinfo.html'))
})
app.post('/hospinfo.html', async (req, res) => {
  try {
    var hospid = req.body.hosp_id
    var hospname = req.body.hosp_name
    var hospem = req.body.hosp_email
    var hospadd = req.body.hosp_address
    var hospphone = req.body.hosp_phone
    var hosporg = req.body.organ
    var locat = req.body.loc
    console.log(locat)
    const arr = locat.split(',')
    let lat = arr[0]
    let long = arr[1]
    let point = `(${long} ${lat})`
    console.log(lat, long)
    const hospinfo = await pool.query(
      'INSERT INTO hospitalinfo(hosp_id,hospname,hosp_address,phone,website,organs,longitude,latitude,geolocation) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [hospid, hospname, hospadd, hospphone, hospem, hosporg, long, lat, point],
    )
    res.redirect('/hospservices.html')
    console.log(hosporg)
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/doctor.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'doctor.html'))
})
app.post('/doctor.html', async (req, res) => {
  try {
    var doc_name = req.body.docname
    var doc_id = req.body.hid
    var mob = req.body.docphone
    var appoint = req.body.time
    const docdetails = await pool.query(
      'INSERT INTO doctor(doc_name,hosp_id,doc_phone ,appointement ) VALUES ($1,$2,$3,$4)',
      [doc_name, doc_id, mob, appoint],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/chemist.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'chemist.html'))
})
app.post('/chemist.html', async (req, res) => {
  try {
    var chem_name = req.body.chemname
    var chem_id = req.body.hospital_id
    var chemph = req.body.chemphone
    var chemadd = req.body.chemadd
    const docdetails = await pool.query(
      'INSERT INTO chemists(hosp_id,chemist_name ,chemist_phone ,chemist_address ) VALUES ($1,$2,$3,$4)',
      [chem_id, chem_name, chemph, chemadd],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/coordinator.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'coordinator.html'))
})
app.post('/coordinator.html', async (req, res) => {
  try {
    var co_name = req.body.tcname
    var co_id = req.body.tcid
    var coph = req.body.tcphone
    var coem = req.body.tcem
    const docdetails = await pool.query(
      'INSERT INTO transplantcoordinator(hosp_id,coordinator_name,coordinator_phone,coordinator_email) VALUES ($1,$2,$3,$4)',
      [co_id, co_name, coph, coem],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/amb.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'ambulance.html'))
})
app.post('/amb.html', async (req, res) => {
  try {
    var amb_name = req.body.ambname
    var ambid = req.body.aid
    var amb_phone = req.body.ambphone
    var amb_add = req.body.ambadd
    const ambdetails = await pool.query(
      'INSERT INTO ambulance(hosp_id,ambulance_name,ambulance_phone,ambulance_address) VALUES ($1,$2,$3,$4)',
      [ambid, amb_name, amb_phone, amb_add],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/bloodbank.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'bloodbank.html'))
})
app.post('/bloodbank.html', async (req, res) => {
  try {
    var bl_name = req.body.bloodname
    var blid = req.body.bid
    var blphone = req.body.bloodphone
    var bladd = req.body.bloodadd
    const bloodbankdetails = await pool.query(
      'INSERT INTO bloodbank(hosp_id,bank_name,bank_phone,bank_address) VALUES ($1,$2,$3,$4)',
      [blid, bl_name, blphone, bladd],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/labs.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'labs.html'))
})
app.post('/labs.html', async (req, res) => {
  try {
    var labname = req.body.lab_name
    var labid = req.body.lab_id
    var labphone = req.body.lab_phone
    var labadd = req.body.lab_address
    var labem = req.body.lab_email
    const labdetails = await pool.query(
      'INSERT INTO labs(hosp_id,lab_name,lab_phone,lab_address,lab_email) VALUES ($1,$2,$3,$4,$5)',
      [labid, labname, labphone, labadd, labem],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/supplies.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'medicalsupplies.html'))
})
app.post('/supplies.html', async (req, res) => {
  try {
    var msname = req.body.ms_name
    var msid = req.body.ms_id
    var msphone = req.body.ms_phone
    var msadd = req.body.ms_address
    var msem = req.body.ms_email
    const labdetails = await pool.query(
      'INSERT INTO medicalsupplies(hosp_id,supply_name,supply_phone,supply_address,supply_email) VALUES ($1,$2,$3,$4,$5)',
      [msid, msname, msphone, msadd, msem],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.post('/login.html', async (req, res) => {
  let flag = 0
  var logid = req.body.lgid
  var logpd = req.body.lgpw
  try {
    var rs = await pool.query(
      'SELECT COUNT(*) FROM hospital WHERE hospital_id=$1 and password=$2',
      [logid, logpd],
    )
    console.log(rs)
    const { rows: rk = [] } = rs
    console.log(rk)
    ;[{ count: c }] = rk
    console.log(c)

    // var st = JSON.stringify(rs.rows)

    // console.log(st.charAt(11))
    const k = c
    if (k > 0) {
      flag = 1
    } else {
      flag = 0
    }
    console.log(flag)
    if (flag == 1) {
      res.sendFile(path.join(__dirname, 'public', '/hospservices.html'))
    } else {
      res.send('wrong info')
    }
  } catch (err) {
    console.error(err.message)
  }
})
// app.get("/recipient.html",function(req,res){
//     res.sendFile(path.join(__dirname,"public","/recipientform.html"))
// });
app.post('/recipientform.html', async (req, res) => {
  var recid = req.body.rid
  var hpid = req.body.hoid
  var bldtype = req.body.bloodtype
  var tst = req.body.tt
  var bodysz = req.body.bsz
  var mpld = req.body.mps
  var nhal = req.body.nha
  var es = req.body.escode
  var hrt = req.body.ht
  var lg = req.body.lung
  var liver = req.body.liv
  var kidn = req.body.kid
  var panc = req.body.pan
  var intt = req.body.intest
  var lym = req.body.ld
  var cbd = req.body.cebd
  var recrp = req.body.rdet
  var orgcode = hrt + lg + liver + kidn + panc + intt
  console.log(orgcode)
  var td = new Date()
  var dt = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate()
  console.log(dt)

  try {
    var recipientdet = await pool.query(
      'INSERT INTO recipient(recipient_id,hospid,bloodtype,tissuetype,bodysize,MELD_PELD_score,regdate,lymphocytotoxic,no_of_HLA_antigens,CMV_EBV_details,Organ_reqcode,emergency_statuscode,recipient_report) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      [
        recid,
        hpid,
        bldtype,
        tst,
        bodysz,
        mpld,
        dt,
        lym,
        nhal,
        cbd,
        orgcode,
        es,
        recrp,
      ],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.post('/braindeath.html', async (req, res) => {
  var doid = req.body.did
  var hlid = req.body.hpid
  var bldtype = req.body.bdtype
  var tsty = req.body.tty
  var bdsz = req.body.bsze
  var mpldsc = req.body.mpsc
  var nhalg = req.body.nhag
  var hert = req.body.hrt
  var lug = req.body.lng
  var livr = req.body.lr
  var kde = req.body.kdn
  var pancr = req.body.pc
  var intesti = req.body.intst
  var lymp = req.body.ld
  var cbd = req.body.cbdet
  var donrp = req.body.pdet
  var orgcode = hert + lug + livr + kde + pancr + intesti
  console.log(orgcode)
  var tdo = new Date()
  var dto = tdo.getFullYear() + '-' + (tdo.getMonth() + 1) + '-' + tdo.getDate()
  console.log(dto)
  try {
    var braindeath = await pool.query(
      'INSERT INTO braindeath(deaddonor_id,hospi_id,bloodtype,tissuetype,bodysize,MELD_PELD_score,regdate,lymphocytotoxic,no_of_HLA_antigens,CMV_EBV_details,Organ_doncode,deaddonor_report) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
      [
        doid,
        hlid,
        bldtype,
        tsty,
        bdsz,
        mpldsc,
        dto,
        lymp,
        nhalg,
        cbd,
        orgcode,
        donrp,
      ],
    )
  } catch (err) {
    console.error(err.message)
  }
})
app.get('/ntwl.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'ntwl.html'))
})
app.post('/ntwl.html', async (req, res) => {
  try {
    var ntwl = await pool.query(
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

    console.log(as, dno)
    res.render('ntwl', {
      NAME: as,
      idno: dno,
      hospidno: hoid,
      lastn: sn,
      adc: aadharc,
      emailid: em,
      addr: add,
      mn: pn,
      nation: cn,
      state: stn,
      zipcode: zp,
      htg: ht,
      wtg: wt,
      gend: gen,
      fat: fan,
      mom: mon,
      odt: orgdt,
      bdt: btype,
      tst: ttype,
      bsz: bs,
      mpsco: mps,
      lyt: lt,
      nha: nlha,
      cb: cbd,
      orc: orq,
      es: esc,
      rg: rgd,
      rrp: rr,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.post('/ntwl/:id', async (req, res) => {
  console.log(req.params)
  var { id: kl } = req.params
  console.log(kl)
  // res.send(`go bro ${kl}`)
  try {
    var ntwl = await pool.query(
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

    console.log(as, dno)
    res.render('details', {
      ik: kl - 1,
      NAME: as,
      idno: dno,
      hospidno: hoid,
      lastn: sn,
      adc: aadharc,
      emailid: em,
      addr: add,
      mn: pn,
      nation: cn,
      state: stn,
      zipcode: zp,
      htg: ht,
      wtg: wt,
      gend: gen,
      fat: fan,
      mom: mon,
      odt: orgdt,
      bdt: btype,
      tst: ttype,
      bsz: bs,
      mpsco: mps,
      lyt: lt,
      nha: nlha,
      cb: cbd,
      orc: orq,
      es: esc,
      rg: rgd,
      rrp: rr,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/matchheart', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchheart.html'))
})
app.post('/match/heart', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  var hosp_id = req.body.hid
  var orgcode = req.body.orgc.split('')
  organ = 'heart'
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []
  if (orgcode[0] == 1) {
    try {
      var code = '1%'
      var result = await pool.query(
        ` CREATE VIEW matchdetails1_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW geloc1_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance)`,
      )
      var match = await pool.query(
        `SELECT * FROM geloc1_V Inner join matchdetails1_V ON geloc1_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      console.log(...match.rows)
      var del = await pool.query('DROP VIEW  matchdetails1_V,geloc1_V')
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.get('/matchlungs', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchlungs.html'))
})
app.post('/match/lungs', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  var hosp_id = req.body.hid
  var orgcode = req.body.orgc.split('')
  organ = 'lungs'
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []

  if (orgcode[1] == 1) {
    try {
      var code = '_1%'
      var result = await pool.query(
        ` CREATE VIEW matchdetails_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW geloc_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance)`,
      )
      var match = await pool.query(
        `SELECT * FROM geloc_V Inner join matchdetails_V ON geloc_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      console.log(...match.rows)
      var del = await pool.query('DROP VIEW  matchdetails_V,geloc_V')
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.get('/matchliver', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchliver.html'))
})
app.post('/match/liver', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  var hosp_id = req.body.hid
  var orgcode = req.body.orgc.split('')
  organ = 'liver'
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []

  if (orgcode[2] == 1) {
    try {
      var code = '__1%'
      var result = await pool.query(
        ` CREATE VIEW matchdetailsl_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW gelocl_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance)`,
      )
      var match = await pool.query(
        `SELECT * FROM gelocl_V Inner join matchdetailsl_V ON gelocl_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      console.log(...match.rows)
      var del = await pool.query('DROP VIEW  matchdetailsl_V,gelocl_V')
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.get('/matchkidney', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchkidney.html'))
})
app.post('/match/kidney', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  var hosp_id = req.body.hid
  var orgcode = req.body.orgc.split('')
  organ = 'kidney'
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []

  if (orgcode[3] == 1) {
    try {
      var code = '___1%'
      var result = await pool.query(
        ` CREATE VIEW matchdetailsk_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW gelock_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance)`,
      )
      var match = await pool.query(
        `SELECT * FROM gelock_V Inner join matchdetailsk_V ON gelock_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      console.log(...match.rows)
      var del = await pool.query('DROP VIEW  matchdetailsk_V,gelock_V')
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.get('/matchpancreas', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchpancreas.html'))
})
app.post('/match/pancreas', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  organ = 'pancreas'
  var hosp_id = req.body.hid
  var orgcode = req.body.orgc.split('')
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []

  if (orgcode[4] == 1) {
    try {
      var code = '____1%'
      var result = await pool.query(
        ` CREATE VIEW matchdetailsp_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW gelocp_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance )`,
      )
      var match = await pool.query(
        `SELECT * FROM gelocp_V Inner join matchdetailsp_V ON gelocp_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      console.log(...match.rows)
      var del = await pool.query('DROP VIEW  matchdetailsp_V,gelocp_V')
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.get('/matchintestines', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchintestines.html'))
})
app.post('/match/intestines', async (req, res) => {
  var userid = req.body.mid
  console.log(userid)
  var hosp_id = req.body.hid
  organ = 'intestine'
  var orgcode = req.body.orgc.split('')
  let hid = [],
    hnm = [],
    dist = [],
    rid = [],
    bd = [],
    tt = [],
    bz = [],
    mps = [],
    lph = [],
    nha = [],
    cmb = [],
    es = [],
    rgdt = [],
    rr = []
  if (orgcode[5] == 1) {
    try {
      var code = '_____1'
      var result = await pool.query(
        ` CREATE VIEW matchdetailsi_V AS ( SELECT hospi_id,deaddonor_id,recipient_id,hospid, recipient.bloodtype, recipient.tissuetype,recipient.bodysize,recipient.meld_peld_score,recipient.lymphocytotoxic,recipient.no_of_hla_antigens,recipient.cmv_ebv_details, emergency_statuscode, recipient.regdate , recipient_report FROM braindeath  Inner JOIN recipient ON braindeath.deaddonor_id=${userid} AND recipient.organ_reqcode like '${code}')`,
      )
      var geloc = await pool.query(
        `CREATE VIEW geloci_V AS (select a.hosp_id,hospname,ST_Distance(a.geolocation,mum.geolocation) as distance from hospitalinfo a,lateral(select hosp_id,geolocation from hospitalinfo where hosp_id='${hosp_id}')as mum where a.hosp_id <> mum.hosp_id order by distance)`,
      )
      var match = await pool.query(
        `SELECT * FROM geloci_V Inner join matchdetailsi_V ON geloci_V.hosp_id=hospid ORDER BY distance,emergency_statuscode,recipient_id`,
      )

      var del = await pool.query('DROP VIEW  matchdetailsi_V,geloci_V')
      console.log(...match.rows)
      match.rows.forEach((el) => {
        hid.push(el.hosp_id)
        hnm.push(el.hospname)
        dist.push(el.distance)

        rid.push(el.recipient_id)
        bd.push(el.bloodtype)
        tt.push(el.tissuetype)
        bz.push(el.bodysize)
        mps.push(el.meld_peld_score)
        lph.push(el.lymphocytotoxic)
        nha.push(el.no_of_hla_antigens)
        cmb.push(el.cmv_ebv_details)
        es.push(el.emergency_statuscode)
        rgdt.push(el.regdate)
        rr.push(el.recipient_report)
      })
      res.render('match', {
        orgn: organ,
        ud: userid,
        hpd: hosp_id,
        orgdc: req.body.orgc,
        hd: hid,
        hm: hnm,
        dst: dist,
        rd: rid,
        bdt: bd,
        tty: tt,
        bsz: bz,
        mpsc: mps,
        lphc: lph,
        nh: nha,
        cm: cmb,
        esc: es,
        rgd: rgdt,
        rrp: rr,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
})
app.post('/match:did/:hd/:orgdon/:org/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `Select * From braindeath where deaddonor_id=${req.params.did}`,
    )
    console.log(...result.rows)
    let dbdtype
    let dtty
    let bsz
    let dmpsc
    let dd
    let dlph
    let dnha
    let dcmb
    let drr
    result.rows.forEach((el) => {
      dbdtype = el.bloodtype
      dtty = el.tissuetype
      dbsz = el.bodysize
      dmpsc = el.meld_peld_score
      dd = el.regdate
      dlphe = el.lymphocytotoxic
      dnha = el.no_of_hla_antigens
      dcmb = el.cmv_ebv_details
      drr = el.deaddonor_report
    })
    res.render('matchid', {
      dbd: dbdtype,
      dtt: dtty,
      dbs: dbsz,
      dpsc: dmpsc,
      ddt: dd,
      dlph: dlphe,
      dnh: dnha,
      dcm: dcmb,
      drp: drr,
      ud: req.params.did,
      hpd: req.params.hd,
      orgdc: req.params.orgdon,
      hm: req.body.hospname,
      hd: req.body.hosp_id,
      orgn: req.params.org,
      rd: req.params.id,
      dst: req.body.distance,
      bdt: req.body.bloodtype,
      tty: req.body.tissuetype,
      bsz: req.body.bodysize,
      mpsc: req.body.meld_peld_score,
      lphc: req.body.lymphocytotoxic,
      nh: req.body.no_of_hla_antigens,
      cm: req.body.cmv_ebv_details,
      esc: req.body.emergency_statuscode,
      rrp: req.body.recipient_report,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.post('/finalmatch/:did:rid/:organ', async (req, res) => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  var oc = req.params.organ
  today = mm + '/' + dd + '/' + yyyy
  try {
    if ((req.params.rid = req.body.recipient_id)) {
      var rec = await pool.query(
        `SELECT * FROM recipient where recipient_id=${req.params.rid}`,
      )
      var ded = await pool.query(
        `SELECT * FROM braindeath where deaddonor_id=${req.params.did}`,
      )
      let kk = []
      let dk = []
      rec.rows.forEach((el) => {
        kk.push(el.recipient_id)
        kk.push(el.hospid)
        kk.push(el.bloodtype)
        kk.push(el.tissuetype)
        kk.push(el.bodysize)
        kk.push(el.meld_peld_score)
        kk.push(el.lymphocytotoxic)
        kk.push(el.no_of_hla_antigens)
        kk.push(el.cmv_ebv_details)
        kk.push(el.organ_reqcode)
        kk.push(el.emergency_statuscode)
        kk.push(el.regdate)
        kk.push(el.recipient_report)
      })
      ded.rows.forEach((el) => {
        dk.push(el.deaddonor_id)
        dk.push(el.hospi_id)
        dk.push(el.bloodtype)
        dk.push(el.tissuetype)
        dk.push(el.bodysize)
        dk.push(el.meld_peld_score)
        dk.push(el.regdate)
        dk.push(el.lymphocytotoxic)
        dk.push(el.no_of_hla_antigens)
        dk.push(el.cmv_ebv_details)
        dk.push(el.organ_doncode)
        dk.push(el.deaddonor_report)
      })
      console.log(...kk)
      console.log(...dk)

      var match = await pool.query(
        'INSERT INTO match(recipient_id,hosp_id,bloodtype ,tissuetype, bodysize, MELD_PELD_score,lymphocytotoxic,no_of_HLA_antigens,CMV_EBV_details,Organ_reqcode,emergency_statuscode, regdate, recipient_report, deaddonor_id,hospi_id, dbloodtype, dtissuetype, dbodysize,dMELD_PELD_score, dregdate, dlymphocytotoxic,dno_of_HLA_antigens, dCMV_EBV_details,dOrgan_doncode, deaddonor_report, Match_orgCode,match_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)',
        [
          kk[0],
          kk[1],
          kk[2],
          kk[3],
          kk[4],
          kk[5],
          kk[6],
          kk[7],
          kk[8],
          kk[9],
          kk[10],
          kk[11],
          kk[12],
          dk[0],
          dk[1],
          dk[2],
          dk[3],
          dk[4],
          dk[5],
          dk[6],
          dk[7],
          dk[8],
          dk[9],
          dk[10],
          dk[11],
          oc,
          today,
        ],
      )
      let md = []
      let kd = []
      md = kk[9].split('')
      kd = dk[10].split('')
      console.log(md, kd)

      if (oc == 'heart') {
        md[0] = '5'
        kd[0] = '5'
      }
      if (oc == 'lungs') {
        md[1] = '5'
        kd[1] = '5'
      }
      if (oc == 'liver') {
        md[2] = '5'
        kd[2] = '5'
      }
      if (oc == 'kidney') {
        md[3] = '5'
        kd[3] = '5'
      }
      if (oc == 'pancreas') {
        md[4] = '5'
        kd[4] = '5'
      }
      if (oc == 'intestine') {
        md[5] = '5'
        kd[5] = '5'
      }
      var recd = md.join('')
      var dcd = kd.join('')
      console.log(recd, dcd)
      var finalrec = await pool.query(
        `UPDATE recipient SET organ_reqcode=${recd} where recipient_id=${req.params.rid}`,
      )
      var finaldd = await pool.query(
        `UPDATE braindeath SET organ_doncode=${dcd} where deaddonor_id=${req.params.did}`,
      )
      res.sendFile(path.join(__dirname, 'public', '/Success.html'))
    } else {
      console.log('error')
    }
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch.html', async (req, res) => {
  try {
    let hd = []
    let hname = []
    var searchres = await pool.query(
      ' select hosp_id,hospname from hospitalinfo',
    )
    searchres.rows.forEach((el) => {
      hd.push(el.hosp_id)
      hname.push(el.hospname)
    })
    console.log(hd)
    res.render('HospitalSearch', {
      hnam: hname,
      hoid: hd,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id', async (req, res) => {
  try {
    var ks = req.params.id
    var hospid = await pool.query(
      'select * from hospitalinfo where hosp_id=$1',
      [ks],
    )
    let hpid = []
    let hspname = []
    let had = []
    let ph = []
    let web = []
    let org = []
    hospid.rows.forEach((el) => {
      hpid.push(el.hosp_id)
      hspname.push(el.hospname)
      had.push(el.hosp_address)
      ph.push(el.phone)
      web.push(el.website)
      org.push(el.organs)
    })
    res.render('hospitalview', {
      hpi: hpid,
      hsp: hspname,
      hadd: had,
      pho: ph,
      webs: web,
      orgn: org,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/doctor', async (req, res) => {
  try {
    var kj = req.params.id
    let dn = []
    let hd = []
    let dp = []
    let appo = []
    var resdoc = await pool.query('select * from doctor  where hosp_id=$1', [
      kj,
    ])
    resdoc.rows.forEach((el) => {
      dn.push(el.doc_name)
      hd.push(el.hosp_id)
      dp.push(el.doc_phone)
      appo.push(el.appointement)
    })
    res.render('docinfo', { dnm: dn, dph: dp, apt: appo })
    console.log(resdoc)
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/chemists', async (req, res) => {
  try {
    var kl = req.params.id
    let cn = []
    let cd = []
    let cp = []
    let cadd = []
    var resdoc = await pool.query('select * from chemists  where hosp_id=$1', [
      kl,
    ])
    resdoc.rows.forEach((el) => {
      cn.push(el.chemist_name)
      cd.push(el.hosp_id)
      cp.push(el.chemist_phone)
      cadd.push(el.chemist_address)
    })
    res.render('cheminfo', { cnm: cn, cph: cp, cdd: cadd })
    console.log(resdoc)
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/transplantcoordinator', async (req, res) => {
  try {
    var kl = req.params.id
    let con = []
    let cid = []
    let cop = []
    let cem = []
    var resdoc = await pool.query(
      'select * from transplantcoordinator  where hosp_id=$1',
      [kl],
    )
    console.log(resdoc.rows)
    resdoc.rows.forEach((el) => {
      con.push(el.coordinator_name)
      cid.push(el.hosp_id)
      cop.push(el.coordinator_phone)
      cem.push(el.coordinator_email)
    })

    res.render('transplant-coordinatorinfo', { cn: con, cph: cop, cm: cem })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/bloodbank', async (req, res) => {
  try {
    var kl = req.params.id
    let bon = []
    let bid = []
    let bop = []
    let bdd = []
    var resdoc = await pool.query('select * from bloodbank  where hosp_id=$1', [
      kl,
    ])
    console.log(resdoc.rows)
    resdoc.rows.forEach((el) => {
      bon.push(el.bank_name)
      bid.push(el.hosp_id)
      bop.push(el.bank_phone)
      bdd.push(el.bank_address)
    })

    res.render('bloodbankinfo', { bn: bon, bph: bop, bd: bdd })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/labs', async (req, res) => {
  try {
    var kl = req.params.id
    let lon = []
    let lid = []
    let lop = []
    let ldd = []
    let lem = []
    var resdoc = await pool.query('select * from labs  where hosp_id=$1', [kl])
    console.log(resdoc.rows)
    resdoc.rows.forEach((el) => {
      lon.push(el.lab_name)
      lid.push(el.hosp_id)
      lop.push(el.lab_phone)
      ldd.push(el.lab_address)
      lem.push(el.lab_email)
    })

    res.render('labinfo', { ln: lon, lph: lop, ld: ldd, lm: lem })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/medicalsupplies', async (req, res) => {
  try {
    var kl = req.params.id
    let mson = []
    let msid = []
    let msop = []
    let msdd = []
    let msem = []
    var resdoc = await pool.query(
      'select * from medicalsupplies  where hosp_id=$1',
      [kl],
    )
    console.log(resdoc.rows)
    resdoc.rows.forEach((el) => {
      mson.push(el.supply_name)
      msid.push(el.hosp_id)
      msop.push(el.supply_phone)
      msdd.push(el.supply_address)
      msem.push(el.supply_email)
    })

    res.render('medicalsupplies', {
      msn: mson,
      msph: msop,
      msd: msdd,
      msm: msem,
    })
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/hospsearch/:id/ambulance', async (req, res) => {
  try {
    var kl = req.params.id
    let an = []
    let ad = []
    let ap = []
    let add = []
    var resdoc = await pool.query('select * from ambulance  where hosp_id=$1', [
      kl,
    ])
    resdoc.rows.forEach((el) => {
      an.push(el.ambulance_name)
      ad.push(el.hosp_id)
      ap.push(el.ambulance_phone)
      add.push(el.ambulance_address)
    })
    res.render('ambulanceinfo', { anm: an, aph: ap, aadd: add })
    console.log(resdoc)
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/matchplatform', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'matchplatform.html'))
})
app.get('/complaint', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'complaintform.html'))
})
app.post('/complaintgo', async (req, res) => {
  try {
    var compname = req.body.cname
    var agname = req.body.aname
    var comp = req.body.complaint
    var red = await pool.query(
      'INSERT INTO complaint(complaint_id,register_name,against,complaint_msg) VALUES (default,$1,$2,$3)',
      [compname, agname, comp],
    )
    var rcid = await pool.query(
      'SELECT complaint_id FROM complaint where register_name=$1 and against=$2 order by complaint_id desc limit 1',
      [compname, agname],
    )
    var x = rcid.rows[0].complaint_id
    console.log(x)
    res.render('comp', { kd: x })
  } catch (err) {
    console.log(err.message)
  }
})
