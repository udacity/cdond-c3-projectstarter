module.exports = {
  apps : [{
    name      : 'UdaPeople',
    script    : '/home/ubuntu/backend/dist/main.js dotenv_config_path=/home/ubuntu/.env',
    node_args : '-r dotenv/config'
  }]
};
