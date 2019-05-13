using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access;
using backend_server.Controllers;
using backend_server.Services;
using backend_server.Util;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;


namespace backend_server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "electron-client";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyMethod()
                            .AllowAnyHeader()
                            .WithOrigins("http://localhost:4200")
                            .AllowCredentials();
                    });
            });


            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.Configure<RazorViewEngineOptions>(o =>
            {
                o.ViewLocationFormats.Clear();
                o.ViewLocationFormats.Add("/Pages/{1}/{0}" + RazorViewEngine.ViewExtension);
                o.ViewLocationFormats.Add("/Pages/{0}" + RazorViewEngine.ViewExtension);
            });

            services.AddScoped<PictureDatabase>();

            services.AddDbContext<PicDbContext>(
                dbOptions =>
                {
                    dbOptions.UseSqlite(Configuration.GetSection("Database")["ConnectionString"],
                        b => b.MigrationsAssembly("backend-server")
                    );
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info{Title = "PicDb", Version = "v1"});
            });

            services.AddSignalR();
            services.AddTransient<ImageService>();
            services.AddSingleton<ImageLoadWorkQueue>();
            services.AddSingleton<IHostedService, ImageLoadBackgroundService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseCors(MyAllowSpecificOrigins);

//            app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseSignalR(builder => {
                builder.MapHub<PictureHub>("/images");
            });
            app.UseMvc();


        }
    }
}
