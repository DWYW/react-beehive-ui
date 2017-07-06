const navigations = [{
   label: "lable1",
   iconClassName: 'icon-home',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/'
   },
   children: []
}, {
   label: "FlexGrid",
   iconClassName: 'icon-wenjian',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/flexgrid'
   },
   children: []
}, {
   label: "Button",
   iconClassName: 'icon-wenjian',
   isOpen: false,
   isSelected: false,
   to: {
      pathname: '/button'
   },
   children: []
},{
   label: "lable2",
   iconClassName: 'icon-setting',
   isOpen: false,
   isSelected: false,
   to: null,
   children: [{
      label: "lable2-1",
      iconClassName: 'icon-qrcode',
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
   iconClassName: 'icon-setting',
   isOpen: false,
   isSelected: false,
   to: null,
   children: [{
      label: "lable3-1",
      iconClassName: 'icon-qrcode',
      isOpen: false,
      isSelected: false,
      to: {
         pathname: '/hello'
      },
      children: []
   }]
}]

export default navigations