using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NumberMaker.Startup))]
namespace NumberMaker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
