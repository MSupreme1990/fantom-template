import Noty from 'noty';

const defaultOptions = {
    timeout: 3000,
    theme: 'mint',
};

export default opts => new Noty(Object.assign(defaultOptions, opts)).show();
