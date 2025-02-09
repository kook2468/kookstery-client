import { signUpAction } from "@/actions/sign-up.action";
import FormInput from "@/components/form-input";
import { useToast } from "@/context/toast.context";
//import { useRouter } from "next/navigation";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Errors {
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
  username?: string | null;
}

export default function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  //const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  //const router = useRouter();
  const { showToast } = useToast();

  const [state, formAction, isPending] = useActionState(signUpAction, null);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(e.target.value);
  // };

  const [agreements, setAgreements] = useState({
    terms_of_service: false,
    privacy_policy: false,
  });

  const allAgree = useMemo(
    () => agreements.terms_of_service && agreements.privacy_policy,
    [agreements]
  );

  const handleCheckboxChange = (name: string, value: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAllAgreeCHange = (value: boolean) => {
    setAgreements({
      terms_of_service: value,
      privacy_policy: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    if (password !== passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    }

    //서버로 데이터 제출
    startTransition(() => {
      formAction(new FormData(e.currentTarget)); // FormData 전달
    });
  };

  useEffect(() => {
    if (state?.status) {
      onSuccess();
    } else if (state?.error) {
      showToast(state.error, "error");
    } else if (state?.errors) {
      setErrors(state?.errors);
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mt-10 mb-4 text-3xl font-bold">회원가입</h1>
      <p className="my-3 text-dark tracking-tight">
        쿡스테리에서 다양한 경험을 누려보세요.
      </p>
      <hr className="border-2 mb-8 border-[#eee]" />

      <FormInput
        name="email"
        type="email"
        label="이메일"
        value={email}
        onChange={onChangeEmail}
        placeholder="kook@gmail.com"
        isRequired={true}
        disabled={isPending}
        error={errors?.email}
      />

      <FormInput
        name="password"
        type="password"
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
        placeholder="4자리 이상 입력해주세요"
        isRequired={true}
        disabled={isPending}
        error={errors?.password}
      />

      <FormInput
        name="password_confirm"
        type="password"
        label="비밀번호 확인"
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
        placeholder="4자리 이상 입력해주세요"
        isRequired={true}
        disabled={isPending}
        error={errors?.passwordConfirm}
      />

      {/* <FormInput
              name="phone"
              type="number"
              label="휴대폰 번호"
              placeholder="'-' 없이 입력해주세요"
              value={phone}
              onChange={onChangePhone}
              isRequired={true}
            /> */}

      <FormInput
        name="username"
        type="text"
        label="사용자 이름"
        value={username}
        onChange={onChangeUsername}
        placeholder="2글자 이상 입력해주세요"
        isRequired={true}
        disabled={isPending}
        error={errors?.username}
      />

      <div className="border border-input p-1 mt-6 tracking-tighter">
        <div className="flex justify-between m-3 pb-3 border-b border-b-gray-400">
          <div>이용약관 및 개인정보 처리방침 동의 (필수)</div>
          <input
            type="checkbox"
            name="all_agree"
            checked={allAgree}
            onChange={(e) => handleAllAgreeCHange(e.target.checked)}
            required
          />
        </div>
        <div className="flex justify-between m-3 pl-3 text-xs">
          <div>· 쿡스테리 이용약관 동의 (필수)</div>
          <input
            type="checkbox"
            name="terms_of_service"
            checked={agreements.terms_of_service}
            onChange={(e) =>
              handleCheckboxChange("terms_of_service", e.target.checked)
            }
            disabled={isPending}
            required
          />
        </div>
        <div className="flex justify-between m-3 pl-3 text-xs">
          <div>· 개인정보 수집 및 이용동의 (필수)</div>
          <input
            type="checkbox"
            name="privacy_policy"
            checked={agreements.privacy_policy}
            onChange={(e) =>
              handleCheckboxChange("privacy_policy", e.target.checked)
            }
            disabled={isPending}
            required
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="btn-primary mt-16 text-base w-64 h-10"
          disabled={isPending}
        >
          가입신청
        </button>
      </div>
    </form>
  );
}
