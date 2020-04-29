import { createHashHistory } from 'history';

const history = createHashHistory({
  hashType: 'slash',
});

export default history;
