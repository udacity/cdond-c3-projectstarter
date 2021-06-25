module.exports = {
  apps : [{
    name      : 'UdaPeople',
    script    : 'dist/main.js dotenv_config_path=/home/ubuntu/.env',
    node_args : '-r dotenv/config'
  }]
};
