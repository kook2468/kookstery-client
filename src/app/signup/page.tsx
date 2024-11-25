export default function SignUpPage() {
  return (
    <div className="bg-white min-h-screen text-black text-sm">
      <div className="w-full h-40 bg-light blur-xl"></div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg">
          <h1 className="mt-10 text-3xl font-bold">회원가입</h1>
          <p className="my-3 text-gray-500 tracking-tight">
            쿡스테리에서 다양한 경험을 누려보세요.
          </p>
          <hr className="border-2 mb-8" />

          <div className="my-3">
            <label>
              이메일 <abbr />
            </label>
            <input
              name="email"
              type="email"
              className="w-full border p-2 my-2"
            />
          </div>

          <div className="my-3">
            <label>
              비밀번호 <abbr />
            </label>
            <input
              name="password"
              type="password"
              className="w-full border p-2 my-2"
            />
          </div>

          <div className="my-3">
            <label>
              비밀번호 확인 <abbr />
            </label>
            <input
              name="password"
              type="password"
              className="w-full border p-2 my-2"
            />
          </div>

          <div className="my-3">
            <label>
              휴대폰 번호 <abbr />
            </label>
            <input
              name="number"
              type="number"
              className="w-full border p-2 my-2"
            />
          </div>

          <div className="border border-gray-300 p-2 mt-6">
            이용약관 및 개인정보 처리방침 동의
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn-primary mt-16 w-64">
              가입신청
            </button>
          </div>

          <footer className="text-center fixed bottom-2">제작 kook@2468</footer>
        </div>
      </div>
    </div>
  );
}
