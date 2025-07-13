"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
export default function ThemedInputOTP({ value = "", length = 6, ...props }) {
  return (
    <InputOTP value={value} maxLength={length} {...props}>
      <InputOTPGroup>
        {[...Array(length)].map((_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
    </InputOTP>
  );
}
