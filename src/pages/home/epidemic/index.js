import Taro from '@tarojs/taro'
import {
  Checkbox,
  CheckboxGroup,
  Image,
  Input,
  Picker,
  Radio,
  RadioGroup,
  ScrollView,
  Text,
  View
} from '@tarojs/components'
import React, {useEffect, useLayoutEffect, useState} from 'react';
import './index.scss'
import {isEmpty} from "../../../utils/EmptyUtil";
import {isIdCard, isMobile} from "../../../utils/RegUtil";
import Forward from '@assets/home/forward.svg'
import {
  callAddEpidemicSurveyApi,
  callDeptListApi, callHighAreaApi, callMidHighAreaApi,
  callXG22ListApi,
  callXGPersonSortApi,
  getJobCaseDicApi
} from "../../../services/home";
import {getCurrentInstance} from "@tarojs/runtime";
import * as user from "../../../utils/user";
import Config from "../../../../project.config.json";
import arrow from '@assets/arrow.svg';
const EpidemicSurvey = () => {
  const [isIphoneX, setIsIphoneX] = useState(false);
  const [addrHome, setAddrHome] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idCard, setIdCard] = useState('');
  const [temperature, setTemperature] = useState('');
  const [clinicDeptRange, setClinicDeptRange] = useState([]);
  const [clinicDept, setClinicDept] = useState('');
  const [clinicDeptId, setClinicDeptId] = useState('');
  const [entourageIdCard, setEntourageIdCard] = useState('');
  const [entourageName, setEntourageName] = useState('');
  const [jobCase, setJobCase] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobCaseRange, setJobRange] = useState([])
  const [personType, setPersonType] = useState('');
  const [personTypeId, setPersonTypeId] = useState('');
  const [personTypeRange, setPersonTypeRange] = useState([]);
  const [personType22, setPersonType22] = useState('');
  const [personTypeId22, setPersonTypeId22] = useState('');
  const [personTypeRange22, setPersonTypeRange22] = useState([]);
  const [multiArray, setMultiArray] = useState([]);
  const [picker_key, setPickerKey] = useState([]);
  const [clinicList] = useState([
    {
      deptName: '???????????????',
      deptCode: '03',
    },
    // {
    //   deptName:'???????????????',
    //   deptCode:'01',
    // }
  ])
  const [patientRelationRange, setPatientRelationRange] = useState([
    "??????",
    "??????",
    '??????',
    "??????",
    '??????',
    '??????',
    '??????',
    '??????',
    '??????',
    '????????????',
    '?????????',
  ]);
  const [patientRelation, setPatientRelation] = useState('');
  const [agree, setAgree] = useState([]);
  const [userType, setUserType] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [zeroValue, setZeroValue] = useState('');
  const [yellowSource, setYellowSource] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [ifTrhistoryNote, setIfTrhistoryNote] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [ifSymptomsNote, setIfSymptomsNote] = useState('');
  const [forthValue, setForthValue] = useState('');
  const [fifthValue, setFifthValue] = useState('');
  const [sixthValue, setSixthValue] = useState('');
  const [accidValue, setAccidValue] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [item, setItem] = useState({});
  const [cityid, setCityId] = useState('');
  const [personId, setPersonId] = useState('');
  const [provinceid, setProvinceId] = useState('');
  const [districtid, setDistrictId] = useState('');
  const [streetdesc, setStreetDesc] = useState('');
  const [identity, setIdentity] = useState('');
  const [who,setWho]=useState('');
  const [midHighDangerAreaRange, setMidHighDangerAreaRange] = useState([])
  const [highDangerAreaList, setHighDangerAreaList] = useState([]);
  const [symptOther,setSmptomsOther]=useState('');
  const [trOther,setTrOther]=useState('');
  // payType	???????????? 0 ???????????? 1 ????????????
  useLayoutEffect(() => {
    Taro.setNavigationBarTitle({
      title: '?????????????????????'
    })
  }, [])
  useEffect(() => {
    const isIphoneX = Taro.getStorageSync('isIphoneX');
    setIsIphoneX(isIphoneX);
    let {item, userType} = getCurrentInstance().router.params;
    const _item = JSON.parse(item);
    const {
      date,
      docUrl,
      idCard,
      name,
      orgId,
      payType,
      phone,
      area,
      timeType,
      sourceId,
      orgName,
      price,
      comboName,
      cityid,//??????id
      districtid,//??????id
      personId,//?????????id
      provinceid,//????????????id
      streetdesc,//????????????
      jobId,
      jobName,
      addrHome,
      relation,
    } = _item;
    setUserType(userType);
    setItem(_item);
    setName(name);
    setPhone(phone);
    setIdCard(idCard);
    setJobCase(jobName);
    setJobId(jobId);
    setAddrHome(addrHome);
    setPatientRelation(relation);
    setProvinceId(provinceid);
    setCityId(cityid);
    setDistrictId(districtid);
    setStreetDesc(streetdesc);
    setPersonId(personId);
    setIsIphoneX(isIphoneX);
    initData();
  }, [])
  const initData = async () => {
    // callDeptListApi(),
    Taro.showLoading({
      title:'?????????...',
      mask:true,
    })
    const {personId}=getCurrentInstance().router.params;
    const res = await Promise.all([getJobCaseDicApi(), callXG22ListApi(), callXGPersonSortApi(), callMidHighAreaApi(), callHighAreaApi()]);
    console.log(333, res);
    if (res[0].code === 200) {
      setJobRange(res[0].data)
    }
    if (res[1].code == 200) {
      setPersonTypeRange22(res[1].data);
    }
    if (res[2].code == 200) {
      setPersonTypeRange(res[2].data);
    }
    if (res[3].code == 200) {
      setMidHighDangerAreaRange([...res[3].data.confValue.split(','), '??????'])
    }
    if (res[4].code == 200) {
      setHighDangerAreaList([...res[4].data.confValue.split(','), '??????'])
      // setHighDangerAreaList(res[4].data);
    }
    for(let i =0;i<clinicList.length;i++){
      let item = clinicList[i];
      let res = await callDeptListApi({supId:item.deptCode})
      if(res.code ==200){
        if(item.deptCode=='03'){
          item.deptCode=='03'&&console.log(11,res.data);
          try {
            res.data.forEach((item,index) => {
              if (item.deptCode == '03076') {
                res.data.unshift(res.data.splice(index, 1)[0])
                throw new Error()
              }
            })
          }catch (e){
            item.children = res.data;
          }
        }else {
          item.children = res.data;
        }
      }
    }
    console.log(333,clinicList);
    getPickerCity([0, 0, 0]);
    Taro.hideLoading();
  }
  const getPickerCity = (key) => {

    let province = [];//???
    let city = [];//???
    // let county = [];//???

    //???
    clinicList.forEach(provinces => {
      province.push(provinces['deptName'])
    });

    //???
    if (clinicList[key[0]]['children'] && clinicList[key[0]]['children'].length > 0) {
      clinicList[key[0]]['children'].forEach(citys => {
        city.push(citys['deptName'])
      })
    }
    // //??????
    // clinicList[key[0]]['children'][key[1]]['children'].forEach(countys => {
    //   county.push(countys['text'])
    // });
    let alls = [];
    alls.push(province)
    alls.push(city)
    // alls.push(county)
    setMultiArray(alls);
    setPickerKey(key);
  }
  const cityColumnChangePicker = (e) => {
    let {column, value} = e.detail
    switch (column) {
      case 0:
        getPickerCity([value, 0, 0])
        break;
      case 1:
        getPickerCity([picker_key[0], value, 0])
        break;
      // case 2:
      //   getPickerCity([picker_key[0], picker_key[1], value])
      //   break;
      default:
        break;
    }
  }
  const cityChangePicker = (e) => {
    let value = e.detail.value;
    if (clinicList.length > 0) {
      // let province = clinicList[value[0]];
      let city = clinicList[value[0]].children[value[1]];
      console.log(3333,city);
      // let district = clinicList[value[0]].children[value[1]].children[value[2]];
      // setProvinceId(province.value);
      setClinicDept(city.deptName);
      setClinicDeptId(city.deptCode)
      // setDistrictId(district.value);
      // console.log(2222, province.value, city.value, district.value);
      // let id = cityRange[value[0]].children[value[1]].children[value[2]].value
    }
  }
  const nextStep = async () => {
    let sex = '', age = 0;
    if(isEmpty(identity)){
      Taro.showToast({
        title: '?????????????????????',
        icon: 'none'
      })
      return;
    }
    if(identity=='??????') {
      if(isEmpty(who)){
        Taro.showToast({
          title: '??????????????????????????????',
          icon: 'none'
        })
        return;
      }
    }
    if (isEmpty(name)) {
      Taro.showToast({
        title: '??????????????????',
        icon: 'none'
      })
      return;
    }
    if (isEmpty(idCard)) {
      Taro.showToast({
        title: '????????????????????????',
        icon: 'none',
      })
      return;
    }
    if (!isIdCard(idCard)) {
      Taro.showToast({
        title: '???????????????????????????',
        icon: 'none',
      })
      return;
    }
    let org_birthday = idCard.substring(6, 14);
    let org_gender = idCard.substring(16, 17);
    sex = org_gender % 2 == 1 ? "???" : "???";
    let birthday = org_birthday.substring(0, 4) + "-" + org_birthday.substring(4, 6) + "-" + org_birthday.substring(6, 8);
    let birthdays = new Date(birthday.replace(/-/g, "/"));
    let d = new Date();
    age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
    // console.log('??????????????????', birthdays)
    // console.log('??????', age)
    if (isEmpty(phone)) {
      Taro.showToast({
        title: '?????????????????????',
        icon: 'none',
      })
      return;
    }
    if (!isMobile(phone)) {
      Taro.showToast({
        title: '????????????????????????',
        icon: 'none',
      })
      return;
    }

    if (isEmpty(addrHome)) {
      Taro.showToast({
        title: '????????????????????????',
        icon: 'none',
      })
      return;
    }
    if (isEmpty(clinicDept)) {
      Taro.showToast({
        title: '?????????????????????',
        icon: 'none',
      })
      return;
    }
    if (isEmpty(personType)) {
      Taro.showToast({
        title: '?????????????????????',
        icon: 'none',
        duration: 3500
      })
      return;
    }
    // if(isEmpty(personType22)){
    //   Taro.showToast({
    //     title:'?????????22?????????',
    //     icon:'none',
    //     duration:3500
    //   })
    //   return;
    // }
    if (!isEmpty(temperature)) {
      if (isNaN(temperature)) {
        Taro.showToast({
          title: '????????????????????????',
          icon: 'none',
        })
        return;
      }
    }
    if (!isEmpty(entourageName)) {
      if (isEmpty(entourageIdCard)) {
        Taro.showToast({
          title: '?????????????????????????????????',
          icon: 'none',
        })
        return;
      }
      if (!isIdCard(entourageIdCard)) {
        Taro.showToast({
          title: '????????????????????????????????????',
          icon: 'none',
        })
        return;
      }
      if (entourageIdCard === idCard) {
        Taro.showToast({
          title: '????????????????????????????????????????????????',
          icon: 'none',
        })
        return;
      }
      if (isEmpty(patientRelation)) {
        Taro.showToast({
          title: '?????????????????????',
          icon: 'none',
        })
        return;
      }
    }
    if(zeroValue==1){
      if(isEmpty(yellowSource)){
        Taro.showToast({
          title: '?????????????????????',
          icon: 'none',
        })
        return;
      }
    }
    if (firstValue == 1) {
      if (isEmpty(ifTrhistoryNote)) {
        Taro.showToast({
          title: '????????????????????????????????????',
          icon: 'none',
        })
        return;
      }
      if(ifTrhistoryNote=='??????'){
        if(isEmpty(trOther)){
          Taro.showToast({
            title: '?????????????????????',
            icon: 'none',
          })
          return;
        }
      }
    }

    if (thirdValue == 1) {
      if (isEmpty(ifSymptomsNote)) {
        Taro.showToast({
          title: '??????????????????????????????????????????',
          icon: 'none',
        })
        return;
      }
      if(ifSymptomsNote=='??????'){
        if(isEmpty(symptOther)){
          Taro.showToast({
            title: '?????????????????????',
            icon: 'none',
          })
          return;
        }
      }
    }
    if (fifthValue == 1) {
      if (isEmpty(sixthValue)) {
        wx.showToast({
          title: '???????????????',
          icon: 'none'
        })
        return;
      }
    }
    if (isEmpty(zeroValue)||isEmpty(firstValue) || isEmpty(secondValue) || isEmpty(thirdValue) || isEmpty(forthValue) || isEmpty(fifthValue)||isEmpty(accidValue)) {
      wx.showToast({
        title: '????????????????????????????????????????????????',
        icon: 'none'
      })
      return;
    }
    if (agree.length === 0) {
      wx.showToast({
        title: '?????????????????????????????????????????????????????????',
        icon: 'none'
      })
      return;
    }
    // const symptomList = [
    //   fifthValue,
    //   secondValue,
    //   thirdValue,
    //   forthValue,
    //   fifthValue
    // ];
    // let bool = symptomList.some(item => item == 1);
    Taro.showLoading({
      title: '?????????...'
    })
    const $res = await user.loginByWeixin({appid: Config.appid});
    if ($res.code === 200) {
      const {userId, wxid, unionid, sectionKey} = $res.data;
      const res = await callAddEpidemicSurveyApi({
        userId,
        idCard,
        isCase: firstValue,
        isCthistory: secondValue,
        isSymptoms: thirdValue,
        isTrhistory: forthValue,
        isWeekbx: fifthValue,
        isWeekbxOther: sixthValue,
        job: jobId,
        jobName: jobCase,
        patientName: name,
        phone,
        sex,
        temperature,
        addrHome,
        dpId: clinicDeptId,
        dpName: clinicDept,
        throng: personTypeId,//??????????????????id
        throngName: personType,//??????????????????
        spThrong: personTypeId22,//????????????????????????id
        spThrongName: personType22,//????????????????????????
        entourageIdCard,
        entourageName,
        entourageRelation: patientRelation,
        cityid,//??????id
        districtid,//??????id
        personId,//?????????id
        provinceid,//????????????id
        streetdesc,//????????????
        report48:accidValue,
        yellowSource:yellowSource,
        identity:identity=='??????'?who+`?????????`:identity,
        ifTrhistoryNote:ifTrhistoryNote=='??????'?trOther:ifTrhistoryNote,
        ifSymptomsNote:ifSymptomsNote=='??????'?symptOther:ifSymptomsNote
      })
      if (res.code == 200) {
        const {personId,item}=getCurrentInstance().router.params;
        let $item = JSON.parse(item);
        Taro.navigateTo({
          url: `/pages/home/write-patient-info/writePatientInfo?item=${JSON.stringify({...$item})}&personId=${personId}&userType=${userType}`
        })
      } else {
        Taro.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      Taro.hideLoading();
    }
    // Taro.navigateTo({
    //   url: `/pages/home/confirm/confirm?item=${JSON.stringify(item)}&userType=2`
    // })
  }
  const selectPatientRelation = (e) => {
    setPatientRelation(patientRelationRange[e.detail.value]);
  }
  const personTypeChange = (e) => {
    setPersonType(personTypeRange[e.detail.value].v_name);
    setPersonTypeId(personTypeRange[e.detail.value].value_id);
  }
  const personTypeChange22 = (e) => {
    setPersonType22(personTypeRange22[e.detail.value].v_name);
    setPersonTypeId22(personTypeRange22[e.detail.value].value_id);
  }
  const firstRadioGroupChange = (e) => {
    if(e.detail.value==0){
      setIfTrhistoryNote('');
    }
    setFirstValue(e.detail.value);
  }
  const secondRadioGroupChange = (e) => {
    setSecondValue(e.detail.value)
  }
  const thirdRadioGroupChange = (e) => {
    if(e.detail.value==0){
      setIfTrhistoryNote('');
    }
    setThirdValue(e.detail.value)
  }
  const forthRadioGroupChange = (e) => {
    setForthValue(e.detail.value)
  }
  const fifthRadioGroupChange = (e) => {
    setIsDisabled(false);
    setFifthValue(e.detail.value);
    if (e.detail.value == 1) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
      setSixthValue('');
    }
  }
  const sixthRadioGroupChange = (e) => {
    setSixthValue(e.detail.value);
  }
  const agreeCheckboxChange = (e) => {
    setAgree(e.detail.value);
  }
  const selectJobCase = (e) => {
    setJobCase(jobCaseRange[e.detail.value].v_name);
    setJobId(jobCaseRange[e.detail.value].value_id)
  }
  const selectMidHighDangerArea = (e) => {
    setIfTrhistoryNote(e.detail.value);
  }
  const accidRadioGroupChange = (e) => {
    setAccidValue(e.detail.value);
  }
  const selectHighDangerArea = (e) => {
    setIfSymptomsNote(e.detail.value);
  }
  const zeroRadioGroupChange = (e) => {
    if(e.detail.value==0){
      setYellowSource('');
    }
    setZeroValue(e.detail.value);
  }
  const selectIdentity = (e) => {
    setIdentity(e.detail.value);
  }
  const selectManageControlArea = (e) => {
    setYellowSource(e.detail.value);
  }
  const onGoMiniProgram = () => {
    Taro.navigateToMiniProgram({
      appId:'wxbebb3cdd9b331046',
      path:'publicService/pages/riskArea/index?previoufooter=???????????????????????????????????????&previoutitle=????????????????????????'
    })
  }
  return (
    <View className='container'>
      <ScrollView showScrollbar={false} enhanced={true}>
        <View className='header-top'>
          <View className='viewHeader'>
            <Text style='color:#333;font-size:15PX;'>??????????????????</Text>
            <Text style='color:#333;font-size:15PX;'>?????????????????????????????????????????????</Text>
          </View>
        </View>
        <View className='viewNotice'>
          <Text style='color:red;font-size:14PX'>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </Text>
          <View onClick={onGoMiniProgram} className='skip-mini'>
            <Text style='color:#3991fa;font-size:14PX'>??????????????????????????????????????????</Text>
            <Image src={arrow} className='forward'/>
          </View>
        </View>
        <View className='address-info-wrap'>
          <View className='address-info-view' style='justify-content:flex-start'>
            <View style='display:flex;alignItems:center;margin-right:65PX;'>
              <Text style='font-size:14PX;color:red;margin-right:2PX;'>*</Text>
              <Text className='dist-name-text'>????????????</Text>
            </View>
            <RadioGroup onChange={selectIdentity}>
              <View style='display:flex;flexWrap:wrap;justifyContent:flex-start'>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D'
                       value='??????' checked = {
                  identity=='??????'
                }>??????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='??????' checked = {
                  identity=='??????'
                }>??????</Radio>
              </View>
            </RadioGroup>
          </View></View>
        <View className='line'/>
        {identity=='??????'&&<View style='height:44PX;display:flex;flex-direction:column;justify-content:center'>
          <View style='display:flex;flex-direction:row;align-items:center;'>
            <Input type="text" style='flex:1;text-align:center;' onInput={e=>{
              setWho(e.detail.value);
            }} placeholder='???????????????????????????????' placeholderClass='list-row-input-placeholder'/>
          </View>
        </View>}
        {identity=='??????'&&<View className='line'/>}
        <ListRow disabled={true} value={name} required className='list-row-input' type='text' label='????????????'
                 placeholder='?????????????????????'/>
        <ListRow disabled={true} value={idCard} required className='list-row-input' type='idcard' label='????????????'
                 placeholder='?????????????????????'/>
        <ListRow disabled={true} value={phone} required className='list-row-input1' type='number' label='?????????'
                 placeholder='???????????????????????????'/>
        <ListRow disabled={true} value={addrHome} required className='list-row-input' type='text' label='????????????'
                 placeholder='????????????????????????????????????'/>
        <Picker value={picker_key} mode="multiSelector" onChange={cityChangePicker}
                onColumnchange={cityColumnChangePicker} range={multiArray}>
          <View className='address-info-container'>
            <View className='address-info-wrap'>
              <View className='address-info-view'>
                <View style='display:flex;alignItems:center'>
                  <Text style='font-size:14PX;color:red;margin-right:2PX;'>*</Text>
                  <Text className='dist-name-text'>????????????</Text>
                  <Text className='select-city-text list-row-input'
                        style={clinicDept === '' ? 'color:#999' : 'color:#666'}>{isEmpty(clinicDept) ? '?????????????????????' : clinicDept}</Text>
                </View>
                <Image src={Forward} className='forward'/>
              </View>
            </View>
            <View className='line'/>
          </View>
        </Picker>
        <Picker mode='selector' rangeKey='v_name' range={personTypeRange} onChange={personTypeChange}>
          <View className='address-info-container'>
            <View className='address-info-wrap'>
              <View className='address-info-view'>
                <View style='display:flex;alignItems:center'>
                  <Text style='font-size:14PX;color:red;margin-right:2PX;'>*</Text>
                  <Text className='dist-name-text'>????????????</Text>
                  <Text className='select-city-text list-row-input'
                        style={personTypeId === '' ? 'color:#999' : 'color:#666'}>{isEmpty(personTypeId) ? '?????????????????????' : personType}</Text>
                </View>
                <Image src={Forward} className='forward'/>
              </View>
            </View>
            <View className='line'/>
          </View>
        </Picker>
        {/*<Picker mode='selector' rangeKey='v_name' range={personTypeRange22} onChange={personTypeChange22}>*/}
        {/*  <View className='address-info-container'>*/}
        {/*    <View className='address-info-wrap'>*/}
        {/*      <View className='address-info-view'>*/}
        {/*        <View style='display:flex;alignItems:center'>*/}
        {/*          <Text style='font-size:14PX;color:red;margin-right:2PX;'>*</Text>*/}
        {/*          <Text className='dist-name-text'>22?????????</Text>*/}
        {/*          <Text className='select-city-text list-row-input'*/}
        {/*                style={personTypeId22 === '' ? 'color:#999' : 'color:#666'}>{isEmpty(personTypeId22) ? '?????????22?????????' : personType22}</Text>*/}
        {/*        </View>*/}
        {/*        <Image src={Forward} className='forward'/>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View className='line'/>*/}
        {/*  </View>*/}
        {/*</Picker>*/}
        <View className='list-row-container'>
          <View className='list-row-wrap'>
            <View className='list-row-view  flex-between'>
              <View style='display:flex;flex-direction:row;align-items:center'>
                <Text style='font-size:14PX;color:red;margin-right:2PX;'/>
                <Text className='list-row-text' style='margin-left:7PX;'>????????????</Text>
              </View>
              <Input type='digit' className='list-row-input' onInput={(e) => {
                setTemperature(e.detail.value);
              }} placeholder={'?????????????????????'}
                     placeholderClass='list-row-input-placeholder'/>
              <View>
                <Text style='font-size:14PX;color:#666'>???</Text>
              </View>
            </View>
          </View>
          <View className='line'/>
        </View>
        <Picker disabled={true} mode='selector' rangeKey='v_name' range={jobCaseRange} onChange={selectJobCase}>
          <View className='address-info-container'>
            <View className='address-info-wrap'>
              <View className='address-info-view'>
                <View style='display:flex;alignItems:center'>
                  <Text style='font-size:14PX;color:red;margin-left:10PX;'/>
                  <Text className='dist-name-text'>????????????</Text>
                  <Text className='select-city-text list-row-input'
                        style={jobCase === '' ? 'color:#999' : 'color:#666'}>{isEmpty(jobCase) ? '???????????????' : jobCase}</Text>
                </View>
                <Image src={Forward} className='forward'/>
              </View>
            </View>
            <View className='line'/>
          </View>
        </Picker>
        <ListRow value={entourageName} className='list-row-input' type='text' onInput={(e) => {
          setEntourageName(e.detail.value);
        }} label='????????????' placeholder='??????????????????????????????'/>
        <ListRow value={entourageIdCard} className='list-row-input' type='idcard' onInput={(e) => {
          setEntourageIdCard(e.detail.value);
        }} label='????????????' placeholder='??????????????????????????????'/>
        <Picker mode='selector' disabled={true} range={patientRelationRange} onChange={selectPatientRelation}>
          <View className='address-info-container'>
            <View className='address-info-wrap'>
              <View className='address-info-view'>
                <View style='display:flex;alignItems:center'>
                  <Text className='dist-name-text' style='margin-left:3PX;'>???????????????</Text>
                  <Text className='select-city-text list-row-input2'
                        style={patientRelation === '' ? 'color:#999' : 'color:#666'}>{isEmpty(patientRelation) ? '???????????????????????????' : patientRelation}</Text>
                </View>
                <Image src={Forward} className='forward'/>
              </View>
            </View>
            <View className='line'/>
          </View>
        </Picker>
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX'
                  className='notice'>1.????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????.</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={zeroRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        {zeroValue == 1 ?
          <View style='margin-top:10PX;display:flex;flex-direction:row;align-items:center;margin-left:10PX'>
            <RadioGroup onChange={selectManageControlArea}>
              <View style='display:flex;flexWrap:wrap;justifyContent:flex-start'>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D'
                       value='?????????'>?????????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='?????????'>?????????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='???????????????'>???????????????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='???????????????'>???????????????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='??????????????????'>??????????????????</Radio>
                <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                       color='#06B48D' value='???????????????????????????????????????????????????'>???????????????????????????????????????????????????</Radio>
              </View>
            </RadioGroup>
          </View> : <View/>}
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX' className='notice'>2.?????????14??????????????????????????????????????????????????????????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={firstRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        {firstValue == 1 ?
          <View style='margin-top:10PX;display:flex;flex-direction:row;align-items:center;margin-left:10PX'>
            <RadioGroup onChange={selectMidHighDangerArea}>
              <View style='display:flex;flex-wrap:wrap;justify-content:flex-start'>

                {midHighDangerAreaRange.map(item => {
                  console.log(333, item);
                  return (
                    <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                           color='#06B48D'
                           value={item}>{item}</Radio>)
                })}
              </View>
            </RadioGroup>
            {ifTrhistoryNote == '??????' && <View style='height:44PX;display:flex;flex-direction:column;justify-content:center'>
              <View style='display:flex;flex-direction:row;align-items:center;'>
                <Input type="text" style='flex:1;text-align:left;' onInput={e => {
                  setTrOther(e.detail.value);
                }} placeholder='?????????????????????' placeholderClass='list-row-input-placeholder'/>
              </View>
            </View>}
            {ifTrhistoryNote == '??????' && <View className='line'/>}
          </View> : <View/>}
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX' className='notice'>3.?????????14???????????????????????????????????????/IGg/IGM??????????????????????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={secondRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text
              style='color:#333;font-size:14PX'
              className='notice'>4.?????????14????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={thirdRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        {thirdValue == 1 ?
          <View style='margin-top:10PX;display:flex;flex-direction:row;align-items:center;margin-left:10PX'>
            <RadioGroup onChange={selectHighDangerArea}>
              <View style='display:flex;flex-wrap:wrap;justify-content:flex-start'>
                {highDangerAreaList.map(item => {
                  return (
                    <Radio style={{transform: 'scale(0.8)', color: '#333',}}
                           color='#06B48D'
                           value={item}>{item}</Radio>
                  )
                })}
              </View>
            </RadioGroup>
            {ifSymptomsNote == '??????' && <View style='height:44PX;display:flex;flex-direction:column;justify-content:center'>
              <View style='display:flex;flex-direction:row;align-items:center;'>
                <Input type="text" style='flex:1;text-align:center;' onInput={e => {
                  setSmptomsOther(e.detail.value);
                }} placeholder='?????????????????????' placeholderClass='list-row-input-placeholder'/>
              </View>
            </View>}
            {ifSymptomsNote == '??????' && <View className='line'/>}
          </View> : <View/>}
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX'
                  className='notice'>5.???14??????????????????????????????????????????????????????????????????????????????????????????????????????2?????????????????????/??????????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={forthRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        <View style='display:flex;flex-direction:column;margin-top:10PX;'>
          <View style='display:flex;flex-direction:row;margin-left:20PX'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX'>6.???2???????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;margin-left:20PX;'>
            <RadioGroup onChange={fifthRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
          {!isHidden ?
            <View style='margin-top:10PX;display:flex;flex-direction:row;align-items:center;margin-left:10PX'>
              <RadioGroup onChange={sixthRadioGroupChange}>
                <View style='display:flex;'>
                  <Radio disabled={isDisabled} style={{transform: 'scale(0.8)', color: isDisabled ? '#999' : '#333',}}
                         color='#06B48D'
                         value='1'>??????</Radio>
                  <Radio disabled={isDisabled} style={{transform: 'scale(0.8)', color: isDisabled ? '#999' : '#333',}}
                         color='#06B48D' value='2'>??????</Radio>
                  <Radio disabled={isDisabled} style={{transform: 'scale(0.8)', color: isDisabled ? '#999' : '#333',}}
                         color='#06B48D' value='3'>??????</Radio>
                  <Radio disabled={isDisabled} style={{transform: 'scale(0.8)', color: isDisabled ? '#999' : '#333',}}
                         color='#06B48D' value='4'>????????????????????????</Radio>
                </View>
              </RadioGroup>
              {/*<CheckboxGroup onChange={checkboxChange}>*/}
              {/*  <Checkbox color='#06B48D' disabled={isDisabled}*/}
              {/*            style={{transform: 'scale(0.8,0.8)', color: isDisabled ? '#999' : '#333', }}*/}
              {/*            value='1'>??????</Checkbox>*/}
              {/*  <Checkbox color='#06B48D' disabled={isDisabled}*/}
              {/*            style={{transform: 'scale(0.8,0.8)', color: isDisabled ? '#999' : '#333',}}*/}
              {/*            value='2'>??????</Checkbox>*/}
              {/*  <Checkbox color='#06B48D' disabled={isDisabled}*/}
              {/*            style={{transform: 'scale(0.8,0.8)', color: isDisabled ? '#999' : '#333',}}*/}
              {/*            value='3'>??????</Checkbox>*/}
              {/*  <Checkbox color='#06B48D' disabled={isDisabled}*/}
              {/*            style={{transform: 'scale(0.8,0.8)', color: isDisabled ? '#999' : '#333',}}*/}
              {/*            value='4'>??????????????????</Checkbox>*/}
              {/*</CheckboxGroup>*/}
            </View> : <View/>}
        </View>
        <View style='display:flex;flex-direction:column;margin-left:20PX;margin-top:10PX;margin-right:20PX'>
          <View style='display:flex;flex-direction:row;'>
            <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text>
            <Text style='color:#333;font-size:14PX'
                  className='notice'>7.?????????48????????????????????????</Text>
          </View>
          <View style='margin-top:10PX;'>
            <RadioGroup onChange={accidRadioGroupChange}>
              <Radio style={{transform: 'scale(0.8)', marginLeft: '20PX', marginRight: '50PX'}} color='#06B48D'
                     value='1'>???</Radio>
              <Radio style={{transform: 'scale(0.8)'}} color='#06B48D' value='0'>???</Radio>
            </RadioGroup>
          </View>
        </View>
        <View className='dash-line' style='margin-top:10PX'/>
        <View style='margin-top:10PX;padding-left:10PX;display:flex;padding-bottom:77PX;'>
          <CheckboxGroup onChange={agreeCheckboxChange}>
            <Checkbox color='#06B48D' style={{transform: 'scale(0.8,0.8)', marginRight: '2PX'}} value='1'/>
          </CheckboxGroup>
          <View>
            <Text style='color:red;font-size:13PX;'
                  className='notice'>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Text>
          </View>
        </View>
      </ScrollView>
      <View className='footer'>
        <View className={disabled ? 'btn-submit-disabled' : 'btn-submit-view'}
              style={isIphoneX ? 'margin-bottom:34rpx' : 'margin-bottom:0rpx'}
              onClick={nextStep}>
          <Text className='btn-submit-text'>??????</Text>
        </View>
      </View>
    </View>
  )
}
const ListRow = (props) => {
  const {label, placeholder, value, disabled, required, className, type, onInput} = props;
  return (
    <View className='list-row-container'>
      <View className='list-row-wrap'>
        <View className='list-row-view'>
          <View style='display:flex;align-items:center'>
            {required ? <Text style='color:red;font-size:14PX;margin-right:2PX;'>*</Text> :
              <View style='margin-right:2PX;'/>}
            <Text className={required ? 'list-row-text' : 'list-row-text1'}>{label}</Text>
          </View>
          <Input type={type} value={value} disabled={disabled} className={className} onInput={onInput}
                 placeholder={placeholder}
                 placeholderClass='list-row-input-placeholder'
          />
        </View>
      </View>
      <View className='line'/>
    </View>
  )
}

export default EpidemicSurvey
