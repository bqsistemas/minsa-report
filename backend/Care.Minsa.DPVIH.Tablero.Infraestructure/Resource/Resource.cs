using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public static class Resource
    {
        public static string Query(string resourceName)
        {
            var lines = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, resourceName));
            return lines;
        }
    }
}
