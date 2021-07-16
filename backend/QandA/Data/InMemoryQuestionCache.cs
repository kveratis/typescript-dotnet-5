using QandA.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace QandA.Data
{
    public class InMemoryQuestionCache : IQuestionCache
    {
        private readonly MemoryCache _cache;

        public InMemoryQuestionCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions { SizeLimit = 100 });
        }

        public QuestionGetSingleResponse Get(int questionId)
        {
            _cache.TryGetValue(GetCacheKey(questionId), out QuestionGetSingleResponse question);
            return question;
        }

        public void Remove(int questionId)
        {
            _cache.Remove(GetCacheKey(questionId));
        }

        public void Set(QuestionGetSingleResponse question)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(GetCacheKey(question.QuestionId), question, cacheEntryOptions);
        }

        private static string GetCacheKey(int questionId) => $"Question-{questionId}";
    }
}
