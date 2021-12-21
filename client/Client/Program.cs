using System;
using System.Collections.Generic;
using Client.Sensors;
using Client.Protocols;

namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {

            // init sensors
            List<SensorInterface> sensors = new List<SensorInterface>();
            sensors.Add(new VirtualSpeedSensor());
            sensors.Add(new VirtualPositionSensor());

            // define protocol
            ProtocolInterface protocol = new Http("http://localhost:8011/drone/123");

            while (true)
            {

                string dati_da_inviare = "";
                int i = 1;

                foreach (SensorInterface sensor in sensors)
                {
                    if (i == 1)
                    {
                        dati_da_inviare = string.Concat("{" + dati_da_inviare + sensor.toJson() + ",");
                    }
                    else if (i < sensors.Count)
                    {
                        dati_da_inviare = string.Concat(dati_da_inviare + sensor.toJson() + ",");
                    }
                    else
                    {
                        dati_da_inviare = string.Concat(dati_da_inviare + sensor.toJson() + "}");
                    }

                    i++;

                }
                
                protocol.Send(dati_da_inviare);

                Console.WriteLine("Data sent: " + dati_da_inviare);
                
                System.Threading.Thread.Sleep(1000);

            }

            #region "Sensore Singolo"
            /*
            // send data to server
            while (true)
            {
                foreach (SensorInterface sensor in sensors)
                {
                    protocol.Send(sensor.toJson());

                    Console.WriteLine("Data sent: " + sensor.toJson());

                    System.Threading.Thread.Sleep(1000);

                }

            }
            */
            #endregion
        }

    }

}
