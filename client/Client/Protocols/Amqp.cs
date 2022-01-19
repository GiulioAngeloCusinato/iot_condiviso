using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;

namespace Client.Protocols
{
    class Amqp : ProtocolInterface
    {
        public void Send(string data)
        {

            var factory = new ConnectionFactory() {HostName = "rat.rmq2.cloudamqp.com" };
            factory.UserName = "grjftmgx";
            factory.Password = "klgkFLrbazS3xiTNk6hYuqOJbXt5OViX";
            factory.VirtualHost = "grjftmgx";
            factory.HostName = "rat.rmq2.cloudamqp.com";
            

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                /*
                channel.QueueDeclare(queue: "hello",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);
                */
                var body = Encoding.UTF8.GetBytes(data);

                channel.BasicPublish(exchange: "CasaDiBrucoGianluco",
                                     routingKey: "DroneTo.Server",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine(" [x] Sent {0}", data);
            }
        }
    }
}
