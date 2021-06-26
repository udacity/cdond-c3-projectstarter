module.exports = {
  apps : [{
    name      : 'UdaPeople',
    script    : '/home/ubuntu/backend/dist/main.js dotenv_config_path=/home/ubuntu/.env',
    exec_mode : 'cluster_mode',
    node_args : '-r dotenv/config'
  }]
};
