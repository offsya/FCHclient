import React, {useState, useRef} from 'react';
import classes from './styles/HistoryInterface.module.css'
import Arrow from './styles/images/hsArrow.svg'
import setsArrow from './styles/images/setsArrow.svg'
import white from './styles/images/white.png'
import spin from './styles/images/spin.gif'
import click from './styles/images/thisVers.svg'
import Slider from './components/Slider'

const HistoryInterface = ({info}) => {


    // 'created': getDate(componentsHistoryVersions[0].created) || getDate(info[1]['0'].created),
    //     'label': componentsHistoryVersions[0].label || info[1]['0'].label,
    //     'editors': componentsHistoryVersions[0].user.handle || info[1]['0'].user.handle

    const [buttonHiddenFirst, setButtonHiddenFirst] = useState(true);
    const [buttonHiddenSecond, setButtonHiddenSecond] = useState(true);

    const [buttonInfo, setButtonInfo] = useState({
        'created': getDate(info[1]['0'].created),
        'label': info[1]['0'].label,
        'editors': info[1]['0'].user.handle
    });
    const [buttonInfoSecond, setButtonInfoSecond] = useState({
        'created': getDate(info[1]['0'].created),
        'label': info[1]['0'].label,
        'editors': info[1]['0'].user.handle
    });


    function getDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

        let Mounth = months[parseInt(date.slice(5,7))-1];
        let Day = parseInt(date.slice(8,10));
        let Hours = parseInt(date.slice(11, 13)) + 3;
        if (Hours >= 24) Hours -= 24;
        const Minutes = date.slice(14, 16);
        return Mounth + ' ' + Day + ' ' + Hours + ':' + Minutes;

    }

    function handleClickFirst() {
        setButtonHiddenFirst(!buttonHiddenFirst);
    }
    function handleClickSecond() {
        setButtonHiddenSecond(!buttonHiddenSecond);
    }

    const [clickHandlerFirst, setClickHandlerFirst] = useState({});

    const [buffClickHandlerFirst, setBuffClickHandlerFirst] = useState('5');

    const [clickHandlerSecond, setClickHandlerSecond] = useState({});

    const [buffClickHandlerSecond, setBuffClickHandlerSecond] = useState('5');

    function buttonInfoHandler(id){
        handleClickFirst();
        componentsHistoryVersions.forEach((item, index) => {
            if(index === id){
                clickHandlerFirst[buffClickHandlerFirst] = false;
                clickHandlerFirst[item.version] = true;
                setBuffClickHandlerFirst(item.version);
                setButtonInfo({
                    'created': getDate(item.created),
                    'label': item.label,
                    'editors': item.user.handle
                });
            }
        })
    }

    function buttonInfoHandlerSecond(id){
        handleClickSecond()
        componentsHistoryVersions.forEach((item, index) => {
            if(index === id){
                clickHandlerSecond[buffClickHandlerSecond] = false;
                clickHandlerSecond[item.version] = true;
                setBuffClickHandlerSecond(item.version);
                setButtonInfoSecond({
                    'created': getDate(item.created),
                    'label': item.label,
                    'editors': item.user.handle
                });
            }
        })
    }

    const componentsIdArray = [];
    const componentsNameArray = [];
    const [chooseComponent, setChooseComponent] = useState({});

    const [buffChooseComponent, setBuffChooseComponent] = useState('117');

    function renderComponents(){
        for(let key in info[0]){
            componentsIdArray.push(key);
            let i = 0;
            for(let keys in info[0][key]){
                i += 1;
                if(i === Object.keys(info[0][key]).length - 1){
                    if(info[0][key][keys].type === 'COMPONENT_SET'){
                        componentsNameArray.push({
                            [key]: {
                                'name': info[0][key][keys].name,
                                'children': info[0][key][keys].children
                            }
                        });
                    }else {
                        componentsNameArray.push({
                            [key]: {
                                'name': info[0][key][keys].name
                            }
                        });
                    }
                }
            }
        }
    }
    renderComponents();


    const [componentsHistoryVersions, setComponentsHistoryVersions] = useState(info[1]);

    const [img, setImg] = useState();
    const [img2, setImg2] = useState();

    const componentsVersions = [];

    const [componentsSetsId, setComponentsSetsId] = useState({});

    function renderComponentsHistory(items){
        if(componentsSetsId.hasOwnProperty(String(Object.keys(items)[0]))){
            componentsSetsId[String(Object.keys(items)[0])] = !componentsSetsId[String(Object.keys(items)[0])]
        }else{
            componentsSetsId[String(Object.keys(items)[0])] = true
        }
        setImg(white);
        setImg2(white);
        componentsVersions.length = 0;
        let i = 0;
        let j = [];
        for(let key in items){

            for(let vers in info[0][Object.keys(items)[0]]){
                delete info[0][Object.keys(items)[0]][vers].absoluteBoundingBox.x;
                delete info[0][Object.keys(items)[0]][vers].absoluteBoundingBox.y;
                if(info[0][Object.keys(items)[0]][vers].type === 'COMPONENT_SET'){
                    for(let child in info[0][Object.keys(items)[0]][vers].children){
                        delete info[0][Object.keys(items)[0]][vers].children[child].absoluteBoundingBox.x;
                        delete info[0][Object.keys(items)[0]][vers].children[child].absoluteBoundingBox.y;
                    }
                }else{
                    delete info[0][Object.keys(items)[0]][vers].children;
                }
            }

            let compareBuff = {};
            for(let compare in info[0][Object.keys(items)[0]]){
                let comp = info[0][Object.keys(items)[0]][compare];
                if(JSON.stringify(comp) != JSON.stringify(compareBuff)){
                    j.push(i);
                    componentsVersions.push(Object.keys(info[0][Object.keys(items)[0]]));
                }
                console.log(Object.keys(info[0][Object.keys(items)[0]]));
                compareBuff = comp;
                i++;
            }

            // console.log(JSON.stringify(info[0][Object.keys(items)[0]]) === JSON.stringify(info[0][Object.keys(items)[0]]))
            // console.log(info[0][Object.keys(items)[0]]);
        }
        const arr = [];
        componentsVersions[0].forEach((versId, index) => {
            info[1].forEach((item, id) => {
                if(versId === item.version){
                    item.ids = Object.keys(items)[0];
                    arr.push(item);
                }
            })
        })

        const buffarr = [];
        let lastHst = j.pop();
        j.forEach((item, index) => {
            buffarr.push(arr[item]);
        })
        lastHst = arr.pop();
        let predLastHst = arr.pop();
        buffarr.push(predLastHst);
        buffarr.push(lastHst);

        console.log(buffarr);


        clickHandlerFirst[buffClickHandlerFirst] = false;
        clickHandlerFirst[info[1]['0'].version] = true;
        setBuffClickHandlerFirst(info[1]['0'].version);

        clickHandlerSecond[buffClickHandlerSecond] = false;
        clickHandlerSecond[info[1]['1'].version] = true;
        setBuffClickHandlerSecond(info[1]['1'].version);

        setButtonInfo({
            'created': getDate(info[1]['0'].created),
            'label': info[1]['0'].label,
            'editors': info[1]['0'].user.handle
        })
        setButtonInfoSecond({
            'created': getDate(info[1]['1'].created) || getDate(info[1]['0'].created),
            'label': info[1]['1'].label || info[1]['0'].label,
            'editors': info[1]['1'].user.handle || info[1]['0'].user.handle
        })

        setComponentsHistoryVersions(buffarr);

        if(buffChooseComponent !== Object.keys(items)[0]){
            setBuffChooseComponent(Object.keys(items)[0]);
            chooseComponent[Object.keys(items)[0]] = true;
            chooseComponent[buffChooseComponent] = false;
        }


    }


    const [loader, setLoader] = useState(true);
    const [loader2, setLoader2] = useState(true);

    async function takeImage(version, id){
        setLoader(false);
        let imageResult = await fetch('https://api.figma.com/v1/images/' + info[3] + '?scale=3&ids=' + id + '&version=' + version, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + info[2],
            },
            versions: version
        }).catch(error => console.log(error));
        let figmaImages = await imageResult.json()

        setImg(figmaImages.images[id]);
        setLoader(true);

    }

    async function takeImage2(version, id){
        setLoader2(false);
        let imageResult = await fetch('https://api.figma.com/v1/images/' + info[3] + '?scale=3&ids=' + id +'&version=' + version, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + info[2],
            },
        }).catch(error => console.log(error));

        let figmaImages = await imageResult.json()

        setImg2(figmaImages.images[id]);

        setLoader2(true);

    }

    const [openComponentSet, setOpenComponentSet] = useState({});

    function setOpenComponentSetHandler(id){
        id.forEach(id => {
            if(openComponentSet.hasOwnProperty(String(id))){
                openComponentSet[String(id)] = !openComponentSet[String(id)]
            }else{
                openComponentSet[String(id)] = false
            }
        })


    }
    let childArr = [];

    const [compareButton, setCompareButton] = useState(true);

    function compareButtonHandler(){
        setCompareButton(!compareButton);
    }

    const slider1 = {
        delay: 500,
        original: {
            url: img,
        },
        modified: {
            url: img2,
        }
    }


    return (
        compareButton ? <div className={classes.contain}>
            <div className={classes.componentsMenu}>
                <ul style={{width: '100%', height: '100%'}} className="list-group list-group-flush">
                    {
                        componentsNameArray.map((items, index) => {
                            var arr = [];
                            if(items[componentsIdArray[index]].hasOwnProperty('children')){
                                arr.length = 0;
                                for(let key in items[Object.keys(items)[0]].children){
                                    arr.push(items[Object.keys(items)[0]].children[key].id);
                                }
                                childArr = [];
                                childArr = arr;
                                return (
                                    <button style={{background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className={classes.componentsMenuButton} onClick={() => {renderComponentsHistory(items); setOpenComponentSetHandler(arr)}}><li key={index} style={{background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className="list-group-item border-0">{items[componentsIdArray[index]].name}<div style={{transform: componentsSetsId[String(Object.keys(items)[0])] ? 'rotate(0deg)' : 'rotate(270deg)' }} className={classes.arrowSets}><img src={setsArrow} alt=""/></div></li></button>
                                )
                            }else{
                                if(openComponentSet.hasOwnProperty([Object.keys(items)[0]])) {
                                    return (
                                        <button style={{
                                            display: openComponentSet[Object.keys(items)[0]] ? 'none' : 'block',
                                            background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'
                                        }} className={classes.componentsMenuButtonSets} onClick={() => {
                                            renderComponentsHistory(items)
                                        }}>
                                            <li key={index}
                                                style={{background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}}
                                                className="list-group-item border-0">{items[componentsIdArray[index]].name}</li>
                                        </button>
                                    )
                                }else{
                                    if(childArr.includes(Object.keys(items)[0])){
                                        return(
                                            <button style={{display: 'none', background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className={classes.componentsMenuButton} onClick={() => {renderComponentsHistory(items)}}><li key={index} style={{background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className="list-group-item border-0">{items[componentsIdArray[index]].name}</li></button>
                                        )
                                    }else{
                                        return(
                                            <button style={{display: 'block', background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className={classes.componentsMenuButton} onClick={() => {renderComponentsHistory(items)}}><li key={index} style={{background: chooseComponent[Object.keys(items)[0]] ? '#F0F0F5' : 'white'}} className="list-group-item border-0">{items[componentsIdArray[index]].name}</li></button>
                                        )
                                    }
                                }

                            }
                        })
                    }
                </ul>
            </div>
            <div>
                <div className={classes.block} style={{height: componentsHistoryVersions.length*80 >= window.innerHeight ? componentsHistoryVersions.length*81 + 'px' : '100vh'}}>
                    <div className={classes.relativeBlock}>
                        <button style={{background: buttonHiddenFirst ? 'white' : '#F0F0F5'}} className={classes.historyOpenButton} onClick={handleClickFirst}>
                            <div style={{display: 'flex'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px', fontWeight: '600'}}>{buttonInfo.created}</div>
                                <div className={classes.arrow}><img src={Arrow} alt=""/></div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div style={{marginLeft: '10px', opacity: 0.6}}>{buttonInfo.label != null ? 'Name: ' + buttonInfo.label + "⠀" : ''}</div>
                                <div style={{opacity: 0.6}}>{'Editors: ' + buttonInfo.editors}</div>
                            </div>
                        </button>
                        <div style={{display: buttonHiddenFirst ? "none" : "block"}}>{
                            componentsHistoryVersions.map((item, index) => {
                                return (
                                    <button className={classes.historyChooseButton}
                                            onClick={() => {buttonInfoHandler(index); takeImage(item.version, item.ids)}}>
                                        <div className={classes.click}>
                                            <div style={{marginLeft: '10px', fontSize: '16px', fontWeight: '600'}}>{getDate(item.created)}</div>
                                            <img style={{display: clickHandlerFirst[item.version] ? 'block' : 'none', marginRight: '18px'}} src={click} alt=""/>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <div
                                                style={{marginLeft: '10px', opacity: 0.6}}>{item.label != null ? 'Name: ' + item.label + "⠀" : ''}</div>
                                            <div style={{opacity: 0.6}}>{'Editors: ' + item.user.handle}</div>
                                        </div>
                                    </button>
                                )
                            })
                        }</div>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><button className={classes.compare} onClick={() => compareButtonHandler()}>{compareButton ? "Compare" : "Back"}</button></div>
                        <div style={{display: buttonHiddenFirst ? 'flex' : 'none'}} className={classes.abs}>{loader ? <img className={classes.img} src={img} alt=""/> : <img className={classes.spin} src={spin} alt=""/>}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={classes.block} style={{height: componentsHistoryVersions.length*80 >= window.innerHeight ? componentsHistoryVersions.length*81 + 'px' : '100vh'}}>
                    <div className={classes.relativeBlock}>
                        <button style={{background: buttonHiddenSecond ? 'white' : '#F0F0F5'}} className={classes.historyOpenButton} onClick={handleClickSecond}>
                            <div style={{display: 'flex'}}>
                                <div style={{marginLeft: '10px', fontSize: '16px', fontWeight: '600'}}>{buttonInfoSecond.created}</div>
                                <div className={classes.arrow}><img src={Arrow} alt=""/></div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div style={{marginLeft: '10px', opacity: 0.6}}>{buttonInfoSecond.label != null ? 'Name: ' + buttonInfoSecond.label + "⠀" : ''}</div>
                                <div style={{opacity: 0.6}}>{'Editors: ' + buttonInfoSecond.editors}</div>
                            </div>
                        </button>
                        <div style={{display: buttonHiddenSecond ? "none" : "block"}}>
                            {componentsHistoryVersions.map((item, index) => {
                                return(
                                    <button className={classes.historyChooseButton} onClick={() => {buttonInfoHandlerSecond(index); takeImage2(item.version, item.ids)}}>
                                        <div className={classes.click}>
                                            <div style={{marginLeft: '10px', fontSize: '16px', fontWeight: '600'}}>{getDate(item.created)}</div>
                                            <img style={{display: clickHandlerSecond[item.version] ? 'block' : 'none', marginRight: '18px'}} src={click} alt=""/>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <div style={{marginLeft: '10px', opacity: 0.6}}>{item.label != null ? 'Name: ' + item.label + "⠀" : ''}</div>
                                            <div style={{opacity: 0.6}}>{'Editors: ' + item.user.handle}</div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><button className={classes.compare} onClick={() => compareButtonHandler()}>{compareButton ? "Compare" : "Back"}</button></div>
                        <div style={{display: buttonHiddenSecond ? 'flex' : 'none'}} className={classes.abs}>{loader2 ? <img className={classes.img} src={img2} alt=""/> : <img className={classes.spin} src={spin} alt=""/>}</div>
                    </div>
                </div>
            </div>
        </div> :
            <div style={{background: '#F7F8FA', height: '100vh'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}><button className={classes.compare} onClick={() => compareButtonHandler()}>{compareButton ? "Compare" : "Back"}</button></div>
                <Slider {...slider1}/>
            </div>
    );
};

export default HistoryInterface;