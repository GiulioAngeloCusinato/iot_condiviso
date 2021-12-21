using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace Client.Sensors
{
    class VirtualPositionSensor : PositionSensorInterface, SensorInterface
    {
        public string toJson()
        {
            return "\"posizione\":" + GetPosition();
            //return "{\"posizione\":" + GetPosition() + "}";
        }

        public string GetPosition()
        {
            var random = new Random();
            string gps = "\"N "+ random.Next(100) + "°"+ random.Next(100) + "'" + random.Next(100) + " E " + random.Next(100) + "°" + random.Next(100) + "'" + random.Next(100) + "\"";
            return gps;
        }
    }
}
