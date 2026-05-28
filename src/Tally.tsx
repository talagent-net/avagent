import { colors } from "./colors";

export type Mode = "hangout" | "jump";

export interface TallyProps {
  scale?: number;
  mode?: Mode;
}

const BASE = {
  width: 200,
  height: 240,
};

export function Tally({ scale = 1, mode = "hangout" }: TallyProps) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "relative",
        width: s(BASE.width),
        height: s(BASE.height),
      }}
    >
      <Body scale={scale}>
        <Head scale={scale}>
          <LeftEye scale={scale} />
          <RightEye scale={scale} />
          <LeftEar scale={scale} />
          <RightEar scale={scale} />
          <Antenna scale={scale} />
        </Head>
        <LeftArm scale={scale} />
        <RightArm scale={scale} />
      </Body>
      <Shadow scale={scale} />
    </div>
  );
}

const BODY_W = 52;
const BODY_H = 68;
const BODY_OFFSET = 12;
const BODY_RADIUS_TOP = 32;
const BODY_RADIUS_BOT = 32;

function Body({
  scale = 1,
  children,
}: {
  scale: number;
  children: React.ReactNode;
}) {
  const s = (v: number) => v * scale;

  const baseRadius = (extra: number) =>
    `${s(BODY_RADIUS_TOP + extra)}px ${s(BODY_RADIUS_TOP + extra)}px ${s(BODY_RADIUS_BOT + extra)}px ${s(BODY_RADIUS_BOT + extra)}px`;

  return (
    <div
      style={{
        position: "absolute",
        bottom: s(30),
        left: "50%",
        transform: "translateX(-50%)",
        width: s(BODY_W + BODY_OFFSET),
        height: s(BODY_H + BODY_OFFSET),
      }}
    >
      {/* Shadow — bottom-right */}
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: 0,
          left: 0,
          width: s(BODY_W + BODY_OFFSET),
          height: s(BODY_H + BODY_OFFSET),
          backgroundColor: colors.primaryDark,
          borderRadius: baseRadius(BODY_OFFSET / 2),
        }}
      />
      {/* Main body face */}
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          top: s(BODY_OFFSET / 2),
          left: s(BODY_OFFSET / 2),
          width: s(BODY_W),
          height: s(BODY_H),
          backgroundColor: colors.primary,
          borderRadius: baseRadius(0),
        }}
      />
      {children}
    </div>
  );
}

const HEAD_W = 130;
const HEAD_H = 90;
const HEAD_OFFSET = 12;
const HEAD_ROUNDNESS = 36;

function Head({
  scale = 1,
  children,
}: {
  scale: number;
  children: React.ReactNode;
}) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 4,
        top: s(-85),
        left: "50%",
        transform: "translateX(-50%)",
        width: s(HEAD_W + HEAD_OFFSET),
        height: s(HEAD_H + HEAD_OFFSET),
      }}
    >
      {/* Head base */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: s(HEAD_W + HEAD_OFFSET),
          height: s(HEAD_H + HEAD_OFFSET),
          backgroundColor: colors.primaryDark,
          borderRadius: s(HEAD_ROUNDNESS + HEAD_OFFSET / 2),
        }}
      />
      {/* Highlight — middle layer, top-left */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: s(HEAD_OFFSET / 2),
          left: s(HEAD_OFFSET / 2),
          width: s(HEAD_W),
          height: s(HEAD_H),
          backgroundColor: colors.primaryMid,
          borderRadius: s(HEAD_ROUNDNESS),
        }}
      />
      {/* Main face — top layer, centered, slightly smaller */}
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          top: s(HEAD_OFFSET * .8),
          left: s(HEAD_OFFSET * .8),
          width: s(HEAD_W  - HEAD_OFFSET * .2),
          height: s(HEAD_H - HEAD_OFFSET * .2),
          background: `linear-gradient(135deg, ${colors.primaryMid} 0%, ${colors.primary} 40%, ${colors.primaryDark} 100%)`,
          borderRadius: s(HEAD_ROUNDNESS - HEAD_OFFSET * .2),
        }}
      />
      {children}
    </div>
  );
}

const EYE_W = 16;
const EYE_H = 28;
const PUPIL_W = 8;
const PUPIL_H = 20;

function LeftEye({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        top: s(HEAD_H * .55),
        left: s(HEAD_W * .24),
        width: s(EYE_W),
        height: s(EYE_H),
        backgroundColor: colors.primaryMid,
        borderRadius: s(EYE_W / 2),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: s((EYE_H - PUPIL_H) / 2),
          left: s((EYE_W - PUPIL_W) / 2),
          width: s(PUPIL_W),
          height: s(PUPIL_H),
          backgroundColor: colors.primaryDark,
          borderRadius: s(PUPIL_W / 2),
        }}
      />
    </div>
  );
}

function RightEye({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        top: s(HEAD_H * .55),
        right: s(HEAD_W * .24),
        width: s(EYE_W),
        height: s(EYE_H),
        backgroundColor: colors.primaryMid,
        borderRadius: s(EYE_W / 2),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: s((EYE_H - PUPIL_H) / 2),
          left: s((EYE_W - PUPIL_W) / 2),
          width: s(PUPIL_W),
          height: s(PUPIL_H),
          backgroundColor: colors.primaryDark,
          borderRadius: s(PUPIL_W / 2),
        }}
      />
    </div>
  );
}

function LeftEar({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 0,
        top: s(HEAD_H * .35),
        left: s(-HEAD_OFFSET / 2),
        width: s(HEAD_OFFSET),
        height: s(HEAD_H * .4),
        backgroundColor: colors.primaryDark,
        borderRadius: `${s(HEAD_ROUNDNESS / 4)}px`,
      }}
    />
  );
}

function RightEar({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 0,
        top: s(HEAD_H * .35),
        right: s(-HEAD_OFFSET / 2),
        width: s(HEAD_OFFSET),
        height: s(HEAD_H * .4),
        backgroundColor: colors.primaryDark,
        borderRadius: `${s(HEAD_ROUNDNESS / 4)}px`,
      }}
    />
  );
}

function Antenna({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 0,
        top: s(-28),
        right: s(HEAD_OFFSET / 2 + 18),
        width: s(9),
        height: s(38),
        backgroundColor: colors.primaryDark,
        borderRadius: s(3),
        transformOrigin: "bottom center",
        transform: "rotate(-15deg)",
      }}
    />
  );
}

const ARM_UPPER_W = 24;
const ARM_UPPER_H = 48;
const ARM_LOWER_W = 24;
const ARM_LOWER_H = 40;
const ARM_OFFSET = 12;

const LEFT_UPPER_ANGLE = 25;
const RIGHT_UPPER_ANGLE = -25;
const LEFT_LOWER_ANGLE = -15;
const RIGHT_LOWER_ANGLE = 15;

function LeftArm({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: s(BODY_H * 0.15),
          left: 0,
          width: s(ARM_UPPER_W),
          height: s(ARM_UPPER_H),
          backgroundColor: colors.primaryDark,
          borderRadius: s(ARM_UPPER_W / 2),
          // Shoulder pivot: inner (right) edge, top
          transformOrigin: `${s(ARM_UPPER_W / 2)}px ${s(ARM_UPPER_W / 2)}px`,
          transform: `rotate(${LEFT_UPPER_ANGLE}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: s(ARM_UPPER_H - ARM_LOWER_W),
            left: 0,
            width: s(ARM_LOWER_W),
            height: s(ARM_LOWER_H),
            backgroundColor: colors.primaryDark,
            borderRadius: s(ARM_LOWER_W / 2),
            // Elbow pivot: center top
            transformOrigin: `${s(ARM_UPPER_W / 2)}px ${s(ARM_LOWER_W / 2)}px`,
            transform: `rotate(${LEFT_LOWER_ANGLE}deg)`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: s((BODY_H * 0.15) + ARM_OFFSET / 2),
          left: s(ARM_OFFSET / 2),
          width: s(ARM_UPPER_W - ARM_OFFSET),
          height: s(ARM_UPPER_H - ARM_OFFSET),
          backgroundColor: colors.primary,
          borderRadius: s(ARM_UPPER_W / 2),
          // Shoulder pivot: inner (right) edge, top
          transformOrigin: `${s((ARM_UPPER_W - ARM_OFFSET) / 2)}px ${s((ARM_UPPER_W - ARM_OFFSET) / 2)}px`,
          transform: `rotate(${LEFT_UPPER_ANGLE}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: s(ARM_UPPER_H - ARM_LOWER_W),
            left: 0,
            width: s(ARM_LOWER_W - ARM_OFFSET),
            height: s(ARM_LOWER_H - ARM_OFFSET),
            backgroundColor: colors.primary,
            borderRadius: s(ARM_LOWER_W / 2),
            // Elbow pivot: center top
            transformOrigin: `${s((ARM_LOWER_W - ARM_OFFSET) / 2)}px ${s((ARM_LOWER_W - ARM_OFFSET) / 2)}px`,
            transform: `rotate(${LEFT_LOWER_ANGLE}deg)`,
          }}
        />
      </div>
    </>
  );
}

function RightArm({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: s(BODY_H * 0.15),
          right: 0,
          width: s(ARM_UPPER_W),
          height: s(ARM_UPPER_H),
          backgroundColor: colors.primaryDark,
          borderRadius: s(ARM_UPPER_W / 2),
          // Shoulder pivot: inner (left) edge, top
          transformOrigin: `${s(ARM_UPPER_W / 2)}px ${s(ARM_UPPER_W / 2)}px`,
          transform: `rotate(${RIGHT_UPPER_ANGLE}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: s(ARM_UPPER_H - ARM_LOWER_W),
            right: 0,
            width: s(ARM_LOWER_W),
            height: s(ARM_LOWER_H),
            backgroundColor: colors.primaryDark,
            borderRadius: s(ARM_LOWER_W / 2),
            // Elbow pivot: center top
            transformOrigin: `${s(ARM_LOWER_W / 2)}px ${s(ARM_LOWER_W / 2)}px`,
            transform: `rotate(${RIGHT_LOWER_ANGLE}deg)`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: s((BODY_H * 0.15) + ARM_OFFSET / 2),
          right: s(ARM_OFFSET / 2),
          width: s(ARM_UPPER_W - ARM_OFFSET),
          height: s(ARM_UPPER_H - ARM_OFFSET),
          backgroundColor: colors.primary,
          borderRadius: s(ARM_UPPER_W / 2),
          // Shoulder pivot: inner (left) edge, top
          transformOrigin: `${s((ARM_UPPER_W - ARM_OFFSET) / 2)}px ${s((ARM_UPPER_W - ARM_OFFSET) / 2)}px`,
          transform: `rotate(${RIGHT_UPPER_ANGLE}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: s(ARM_UPPER_H - ARM_LOWER_W),
            right: 0,
            width: s(ARM_LOWER_W - ARM_OFFSET),
            height: s(ARM_LOWER_H - ARM_OFFSET),
            backgroundColor: colors.primary,
            borderRadius: s(ARM_LOWER_W / 2),
            // Elbow pivot: center top
            transformOrigin: `${s((ARM_LOWER_W - ARM_OFFSET) / 2)}px ${s((ARM_LOWER_W - ARM_OFFSET) / 2)}px`,
            transform: `rotate(${RIGHT_LOWER_ANGLE}deg)`,
          }}
        />
      </div>
    </>
  );
}

function Shadow({ scale = 1 }: { scale: number }) {
  const s = (v: number) => v * scale;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: s(80),
        height: s(14),
        backgroundColor: "rgba(0,0,0,0.08)",
        borderRadius: "50%",
        filter: `blur(${s(3)}px)`,
      }}
    />
  );
}
