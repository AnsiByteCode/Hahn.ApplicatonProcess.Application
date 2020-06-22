using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.AspNetCore;
using Hahn.ApplicatonProcess.May2020.Data.DataContext;
using Hahn.ApplicatonProcess.May2020.Data.DbSets.Models;
using Hahn.ApplicatonProcess.May2020.Data.Validators;
using Hahn.ApplicatonProcess.May2020.Domain.Interfaces;
using Hahn.ApplicatonProcess.May2020.Domain.ResponseExamples;
using Hahn.ApplicatonProcess.May2020.Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;
using Swashbuckle.AspNetCore.Filters;

namespace AureliaDotnetTemplate {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.AddSingleton<IConfiguration>(provider => Configuration);
			services.Configure<CookiePolicyOptions>(options => {
				// This lambda determines whether user consent for non-essential cookies is needed for a given request.
				options.CheckConsentNeeded = context => true;
			});

			services.AddDbContext<HahnDBContext>(options => options.UseInMemoryDatabase(databaseName: "HahnAppDb"));
			services.AddScoped<IApplicantService, ApplicantService>();
			services.AddMvc().AddFluentValidation();
			services.AddTransient<IValidator<Applicant>, ApplicantValidator>();
			Log.Logger = new LoggerConfiguration().MinimumLevel.Debug().ReadFrom.Configuration(Configuration).CreateLogger();
			services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

				// [SwaggerRequestExample] & [SwaggerResponseExample]
				// version < 3.0 like this: c.OperationFilter<ExamplesOperationFilter>(); 
				// version 3.0 like this: c.AddSwaggerExamples(services.BuildServiceProvider());
				// version > 4.0 like this:
				c.ExampleFilters();

				c.OperationFilter<AddHeaderOperationFilter>("correlationId", "Correlation Id for the request", false); // adds any string you like to the request headers - in this case, a correlation id
				c.OperationFilter<AddResponseHeadersFilter>(); // [SwaggerResponseHeader]

				//var filePath = Path.Combine(AppContext.BaseDirectory, "WebApi.xml");
				//c.IncludeXmlComments(filePath); // standard Swashbuckle functionality, this needs to be before c.OperationFilter<AppendAuthorizeToSummaryOperationFilter>()

				c.OperationFilter<AppendAuthorizeToSummaryOperationFilter>(); // Adds "(Auth)" to the summary so that you can see which endpoints have Authorization
																			  // or use the generic method, e.g. c.OperationFilter<AppendAuthorizeToSummaryOperationFilter<MyCustomAttribute>>();

				// add Security information to each operation for OAuth2
				c.OperationFilter<SecurityRequirementsOperationFilter>();
				// or use the generic method, e.g. c.OperationFilter<SecurityRequirementsOperationFilter<MyCustomAttribute>>();

				//// if you're using the SecurityRequirementsOperationFilter, you also need to tell Swashbuckle you're using OAuth2
				//c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
				//{
				//    Description = "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
				//    In = ParameterLocation.Header,
				//    Name = "Authorization",
				//    Type = SecuritySchemeType.ApiKey
				//});
			});
			services.AddSwaggerExamplesFromAssemblyOf<ApplicantExamplePut>();

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}
			else {
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c => {
				//c.SwaggerEndpoint("v1/swagger.json", "My API V1");
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyAPI V1");
			});

			StaticFileOptions options = new StaticFileOptions();
			FileExtensionContentTypeProvider typeProvider = new FileExtensionContentTypeProvider();
			if (!typeProvider.Mappings.ContainsKey(".woff2")) {
				typeProvider.Mappings.Add(".woff2", "application/font-woff2");
			}
			if (!typeProvider.Mappings.ContainsKey(".woff")) {
				typeProvider.Mappings.Add(".woff", "application/font-woff");
			}
			if (!typeProvider.Mappings.ContainsKey(".ttf")) {
				typeProvider.Mappings.Add(".ttf", "application/font-ttf");
			}
			options.ContentTypeProvider = typeProvider;
			app.UseStaticFiles();
			app.UseHttpsRedirection();
			app.UseFileServer();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}
	}
}
