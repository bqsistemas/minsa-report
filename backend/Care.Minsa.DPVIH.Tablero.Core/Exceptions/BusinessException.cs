using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Exceptions
{
    public class BusinessException : Exception
    {
        public object Details { get; private set; }

        public BusinessException(string message) : base(message)
        {
        }

        public BusinessException(string message, object details) : base(message)
        {
            this.Details = details;
        }
    }
}
