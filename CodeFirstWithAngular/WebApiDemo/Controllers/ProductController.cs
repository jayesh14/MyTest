using EFCodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiDemo.ActionFilters;

namespace WebApiDemo.Controllers
{
    [AuthorizationRequired]
    [RoutePrefix("Product")]
    public class ProductController : ApiController
    {

        [Route("Save")]
        [HttpPost]
        public void Save(Product product)
        {
            SchoolContext schoolContext = new SchoolContext();
            schoolContext.Products.Add(product);
            if (product.ProductID > 0)
                schoolContext.Entry(product).State = EntityState.Modified;
            schoolContext.SaveChanges();
        }

        [Route("GetAll")]
        [HttpPost]
        public IList<Product> GetAll(EFCodeFirst.PageSortSearch pageSortSearch)
        {
            SchoolContext schoolContext = new SchoolContext();
            int TotalRecord = schoolContext.Products.ToList().Count;
            int TotalSkip = (pageSortSearch.pageNumber - 1) * pageSortSearch.pageSize;
            if (TotalRecord != 0 && TotalRecord == TotalSkip)
            {
                TotalSkip = (pageSortSearch.pageNumber - 2) * pageSortSearch.pageSize;
            }
            List<Product> products = new List<Product>();
            var propertyInfo = typeof(Product).GetProperty(pageSortSearch.sortBy);

            if (pageSortSearch.sort == HelperClass.Common.OrderDirection.desc.ToString())
                products = schoolContext.Products.AsEnumerable().OrderByDescending(x => propertyInfo.GetValue(x, null)).Skip(TotalSkip).Take(pageSortSearch.pageSize).ToList();
            else
                products = schoolContext.Products.AsEnumerable().OrderBy(x => propertyInfo.GetValue(x, null)).Skip(TotalSkip).Take(pageSortSearch.pageSize).ToList();



            if (products != null && products.Count > 0)
                products[0].pageSortSearch.totalItems = TotalRecord;

            return products;
        }

        [Route("Get/{ID}")]
        public Product Get(int ID)
        {
            SchoolContext schoolContext = new SchoolContext();
            Product product = schoolContext.Products.Where(a => a.ProductID == ID).FirstOrDefault();
            if (product == null)
                product = new Product();
            return product;
        }

        [Route("Delete/{id}")]
        [HttpGet]
        public void DeleteStudent(int id)
        {
            SchoolContext schoolContext = new SchoolContext();
            schoolContext.Products.Remove(schoolContext.Products.Where(x => x.ProductID == id).FirstOrDefault());
            schoolContext.SaveChanges();
        }


    }
}
