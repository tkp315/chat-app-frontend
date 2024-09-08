

function ActiveTab(index, activeTabIndex,setActiveTabIndex,cb){
   console.log("index:",index)
 if(activeTabIndex===index)setActiveTabIndex(null)
    else setActiveTabIndex(index)
 cb(index)
}



export {ActiveTab}

