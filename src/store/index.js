import Vue from 'vue'
import VueX from 'vueX'


Vue.use(VueX)
const storeIndex = {
  state: {
    count: 1,
    csrfToken: '',
    indexData: {
      homedata: {},
      studydata: {},
    },
    manageData: {
      navdata: [],
      tabdata: {},
      articles: [],
      types: [],
      secTypes: [],
    },
  },
  mutations: {
    initIndex: (state, data) => {
      state.indexData = data
    },
    initManage: (state, data) => {
      state.manageData = data
      state.manageData.tabdata = {
        editableTabsValue: '1',
        editableTabs: [{
          title: '文章管理',
          name: '1',
          component: myManArticles
        }],
        tabIndex: 1,
      }
    },
    addManageTabs: (state, data) => {
      let newTabName = ++state.manageData.tabdata.tabIndex + '';
      let newTab = {
        title: data.title,
        name: newTabName,
        component: data.component
      }
      state.manageData.tabdata.editableTabs.push(newTab);
      state.manageData.tabdata.editableTabsValue = newTabName;
    },
    removeManageTabs: (state, targetName) => {
      let tabs = state.manageData.tabdata.editableTabs;
      let activeName = state.manageData.tabdata.editableTabsValue;
      console.log(activeName)
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      state.manageData.tabdata.editableTabsValue = activeName;
      state.manageData.tabdata.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    setActiveManageTabs: (state, targetName) => {
      state.manageData.tabdata.editableTabsValue = targetName;
    },
    setManageTypes: (state, types) => {
      state.manageData.types = types
    },
    initManageArticles: (state) => {
      axios.get('/api/manage/articles').then((response) => {
        state.manageData.articles = response.data
      })
    },
  },
  actions: {

  },
  getters: {

  }
}
const storeArticle = {

}
const storeManage = {
  state: {
    count: 1,
    editableTabs: [],
    editableTabsValue: '1',
    tabIndex: 1,
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
}
const store = new VueX.Store(storeIndex)
//const store = new VueX.Store({
//  modules: {
//    storeIndex: storeIndex,
//    storeArticle: storeArticle,
//    storeManage: storeManage,
//  }
//})
export default store
