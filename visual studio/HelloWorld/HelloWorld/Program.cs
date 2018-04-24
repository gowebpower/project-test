using System;
using System.Collections.Generic;

namespace HelloWorld
{

    /*
    class Program
    {
        static void Main(string[] args)
        {   

            var number = 1;
            Console.WriteLine( OtherFunction() ); 
            ddd();


        }

        static int OtherFunction()
        {
  
            return 123;

        }

        static void ddd()
        {

            try {
                Console.Write("Divide 15 by");
                int num = int.Parse(Console.ReadLine());
                Console.WriteLine(num + " " + (10 / num));

            }
            catch (DivideByZeroException ex) {

                Console.WriteLine("Can'ts divide by zero");

                Console.WriteLine( ex.GetType().Name );

            }

        }

    } */

    class Animal
    {


        /*  Public  */
        public string name;
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public int weight { get; set; }
        public int height { get; set; }
        public string sound{ get; set; }

        

        public Animal()
        {
            this.name = "No Name";
            this.weight = 0;
            this.height = 0;
            this.sound = "No Sound....";
            numOfAnimals++;
        }

        public Animal( int weight, int height, string name, string sound)
        {
            this.name = name;
            this.weight = weight;
            this.height = height;
            this.sound = sound;
            numOfAnimals++; 
        }

        public string introduceAnimal()
        {
            return String.Format("{0} is {1} inches tall, weights {2} lbs and likes to say{3}", name, height, weight, sound);
        }

        /*  Static  */
 

        static int numOfAnimals = 0;

        public static int getNumOfAnimals()
        {
            return numOfAnimals;
        }



        /*  Main  */
 
        static void Main(string[] args)
        {

            Animal gongju = new Animal();
            Animal kodol = new Animal(15, 10, "kodol", " Meow");

            Console.WriteLine("{0} says {1}", gongju.name, gongju.sound);

            Console.WriteLine(gongju.introduceAnimal());

            Console.WriteLine("Number of Animals " + Animal.getNumOfAnimals());


        }

        /*  Continue to 57.14 */

    }

}  