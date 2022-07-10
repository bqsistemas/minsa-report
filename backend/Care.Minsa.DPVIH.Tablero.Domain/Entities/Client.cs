using System;
using System.Collections.Generic;
using Care.Minsa.DPVIH.Tablero.Core.Enums;
using Care.Minsa.DPVIH.Tablero.Core.Crypt;

namespace Care.Minsa.DPVIH.Tablero.Domain.Entities
{
    public partial class Client : Person
    {
        public Guid ClientId { get; private set; }
        public string Password { get; private set; }
        public bool Status { get; private set; }
        public List<Account> Accounts { get; private set; }
        public Client()
        {

        }
        public Client(
                string name,
                GenderType gender,
                int age,
                string identificationNumber,
                string address,
                string phoneNumber,
                string password
            )
        {
            this.Name = name;
            this.Gender = gender;
            this.Age = age;
            this.IdentificationNumber = identificationNumber;
            this.Address = address;
            this.PhoneNumber = phoneNumber;
            this.Password = HashMaker.HashPassword(password);
            this.Status = true;
        }

        public void SetNewData(
            string name,
            GenderType gender,
            int age,
            string address,
            string phoneNumber
            )
        {
            this.Name = name;
            this.Gender = gender;
            this.Age = age;
            this.Address = address;
            this.PhoneNumber = phoneNumber;
        }

        public void SetStatus(bool status)
        {
            Status = status;
        }
    }
}
