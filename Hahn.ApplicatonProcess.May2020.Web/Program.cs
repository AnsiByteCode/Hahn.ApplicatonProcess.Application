using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hahn.ApplicatonProcess.May2020.Data.DataContext;
using Hahn.ApplicatonProcess.May2020.Data.DataGenerator;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace AureliaDotnetTemplate {
	public class Program {
		public static void Main(string[] args) {
			//1. Get the Host which will host this application.
			var host = CreateHostBuilder(args).Build();

			//2. Find the service layer within our scope.
			using (var scope = host.Services.CreateScope()) {
				//3. Get the instance of DBContext in our services layer
				var services = scope.ServiceProvider;
				var context = services.GetRequiredService<HahnDBContext>();

				//4. Call the DataGenerator to create sample data
				InitDataGenerator.Initialize(services);
			}

			//Continue to run the application
			host.Run();

		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder => {
					webBuilder.UseStartup<Startup>().UseSerilog();
				});
	}
}
