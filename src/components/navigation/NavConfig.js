const navigations = [{
   label: "home",
   iconClassName: 'icon-wenjian',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/'
   },
   children: []
}, {
   label: "FlexGrid",
   iconClassName: 'icon-zujianku',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/flexgrid'
   },
   children: []
}, {
   label: "Button",
   iconClassName: 'icon-Onebuttonalarm',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/button'
   },
   children: []
}, {
   label: "Input",
   iconClassName: 'icon-shuru',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/input'
   },
   children: []
}, {
   label: "CheckBox",
   iconClassName: 'icon-checkbox-checked',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/checkbox'
   },
   children: []
}, {
   label: "lable2",
   iconClassName: 'icon-zujian1',
   isOpen: false,
   isSelected: false,
   to: null,
   children: [{
      label: "lable2-1",
      iconClassName: 'icon-zujian',
      isOpen: false,
      isSelected: false,
      to: {
         pathname: '/welcome'
      },
      query: {},
      children: []
   }]
}, {
   label: "lable3",
   iconClassName: 'icon-zujian1',
   isOpen: false,
   isSelected: false,
   to: null,
   children: [{
      label: "lable3-1",
      iconClassName: 'icon-zujian',
      isOpen: false,
      isSelected: false,
      to: {
         pathname: '/hello'
      },
      children: []
   }]
}]

export default navigations