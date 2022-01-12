using System;
using System.Net;
using System.IO;
using MQTTnet;
using MQTTnet.Client.Options;
using MQTTnet.Client;
using MQTTnet.Client.Connecting;
using System.Threading;
using System.Threading.Tasks;

namespace Client.Protocols
{
    class Mqtt : ProtocolInterface
    {
        private const string TOPIC_PREFIX = "iot2021/123/";
        private IMqttClient mqttClient;
        private string endpoint;

        public Mqtt(string endpoint)
        {
            this.endpoint = endpoint;

            Connect().GetAwaiter().GetResult();
        }

        private async Task<MqttClientConnectResult> Connect()
        {
            var factory = new MqttFactory();

            var options = new MqttClientOptionsBuilder()
                .WithTcpServer(this.endpoint)
                .Build();

            mqttClient = factory.CreateMqttClient();

            return await mqttClient.ConnectAsync(options, CancellationToken.None);
        }

        public async void Send(string data)
        {
            string sensor = "generico";
            var message = new MqttApplicationMessageBuilder()
                .WithTopic(TOPIC_PREFIX + sensor)
                .WithPayload(data)
                .WithExactlyOnceQoS()
                .Build();

            await mqttClient.PublishAsync(message, CancellationToken.None);
        }
    }
}
