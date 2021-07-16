using Microsoft.AspNetCore.Authorization;

namespace QandA.Authorization
{
    public sealed class MustBeQuestionAuthorRequirement : IAuthorizationRequirement
    {
        public MustBeQuestionAuthorRequirement()
        {

        }
    }
}
