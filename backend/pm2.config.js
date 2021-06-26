module.exports = {
  apps : [{
    name      : 'UdaPeople',
    script    : '/home/ubuntu/backend/dist/main.js',
    exec_mode : 'cluster_mode',
    node_args : '-r dotenv/config'
  }]
};
