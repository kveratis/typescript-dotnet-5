/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fontFamily, fontSize, gray2 } from './Styles';
import { AuthProvider } from './components/auth/Auth';
import AuthorizedPage from './components/auth/AuthorizedPage';
import Header from './Header';
import HomePage from './HomePage';
import QuestionPage from './QuestionPage';
import SearchPage from './SearchPage';
import SignInPage from './components/auth/SignInPage';
import SignOutPage from './components/auth/SignOutPage';
import NotFoundPage from './NotFoundPage';

const AskPage = React.lazy(() => import('./AskPage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          {/* <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}> */}
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="signin" element={<SignInPage action="signin" />} />
            <Route
              path="signin/callback"
              element={<SignInPage action="signin-callback" />}
            />
            <Route path="signout" element={<SignOutPage action="signout" />} />
            <Route
              path="signout/callback"
              element={<SignOutPage action="signout-callback" />}
            />
            <Route
              path="ask"
              element={
                <React.Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AuthorizedPage>
                    <AskPage />
                  </AuthorizedPage>
                </React.Suspense>
              }
            />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* </Security> */}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
