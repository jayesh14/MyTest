using EFCodeFirst;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using System.Data.Entity;

namespace WebApiDemo.HelperClass
{
    public class TokenManagement : ApiController
    {
        SchoolContext context = new SchoolContext();
        private HttpResponseMessage GetAuthToken(int userId)
        {
            var token = GenerateToken(userId);//_tokenServices.GenerateToken(userId);
            var response = Request.CreateResponse(HttpStatusCode.OK, "Authorized");
            response.Headers.Add("Token", token.AuthToken);
            response.Headers.Add("TokenExpiry", ConfigurationManager.AppSettings["AuthTokenExpiry"]);
            response.Headers.Add("Access-Control-Expose-Headers", "Token,TokenExpiry");
            return response;
        }


        public Token GenerateToken(int userId)
        {
            string token = Guid.NewGuid().ToString();
            DateTime issuedOn = DateTime.Now;
            DateTime expiredOn = DateTime.Now.AddSeconds(Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
            var tokendomain = new Token
            {
                UserId = userId,
                AuthToken = token,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn
            };

            context.Tokens.Add(tokendomain);
            context.SaveChanges();
            //_unitOfWork.TokenRepository.Insert(tokendomain);
            //_unitOfWork.Save();

            // Insert Token in database
            var tokenModel = new Token()
            {
                UserId = userId,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn,
                AuthToken = token
            };

            return tokenModel;
        }


        public bool ValidateToken(string tokenId)
        {

            Token token = context.Tokens.Where(t => t.AuthToken == tokenId && t.ExpiresOn > DateTime.Now).FirstOrDefault(); //_unitOfWork.TokenRepository.Get(t => t.AuthToken == tokenId && t.ExpiresOn > DateTime.Now);
            if (token != null && !(DateTime.Now > token.ExpiresOn))
            {
                token.ExpiresOn = token.ExpiresOn.AddSeconds(Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));

                context.Tokens.Add(token);
                context.Entry(token).State = EntityState.Modified;
                context.SaveChanges();
                //_unitOfWork.TokenRepository.Update(token);
                //_unitOfWork.Save();
                return true;
            }
            return false;
        }


        public bool Kill(string tokenId)
        {

            context.Tokens.Remove(context.Tokens.Where(x => x.AuthToken == tokenId).FirstOrDefault());
            context.SaveChanges();
            //_unitOfWork.TokenRepository.Delete(x => x.AuthToken == tokenId);
            //_unitOfWork.Save();
            var isNotDeleted = true;//_unitOfWork.TokenRepository.GetMany(x => x.AuthToken == tokenId).Any();
            if (isNotDeleted) { return false; }
            return true;
        }

        public bool DeleteByUserId(int userId)
        {
            //_unitOfWork.TokenRepository.Delete(x => x.UserId == userId);
            //_unitOfWork.Save();
            context.Students.Remove(context.Students.Where(x => x.StudentID == userId).FirstOrDefault());
            context.SaveChanges();
            var isNotDeleted = true;// _unitOfWork.TokenRepository.GetMany(x => x.UserId == userId).Any();
            return !isNotDeleted;
        }

    }
}