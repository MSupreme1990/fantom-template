import Icon from './icon';

export default {
    version: '1.0.0',

    Icon: Icon,

    icon: function(options) {
        return new Icon(options);
    },
};
