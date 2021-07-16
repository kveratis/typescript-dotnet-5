using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

using QandA.Data;

using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QandA.Authorization
{
    public sealed class MustBeQuestionAuthorHandler : AuthorizationHandler<MustBeQuestionAuthorRequirement>
    {
        private readonly IDataRepository _dataRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MustBeQuestionAuthorHandler(IDataRepository dataRepository, IHttpContextAccessor httpContextAccessor)
        {
            _dataRepository = dataRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        protected async override Task HandleRequirementAsync(AuthorizationHandlerContext context, MustBeQuestionAuthorRequirement requirement)
        {
            // Check that the user is Authenticated
            if(!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            // Get Question Id from request path
            var questionId = _httpContextAccessor.HttpContext.Request.RouteValues["questionId"];
            var questionIdAsInt = Convert.ToInt32(questionId);

            // Get User Id from users's identity claim
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var question = await _dataRepository.GetQuestionAsync(questionIdAsInt);

            if(question == null)
            {
                // Let it through so the controller can return 404 (not found) rather than 401 (unauthorized)
                context.Succeed(requirement);
                return;
            }

            // Check that userId in the request matches the question in the database
            if(question.UserId != userId)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
